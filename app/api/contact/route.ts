import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, TablesInsert } from "@/integrations/supabase/types";
import { getNotifyEmail } from "@/lib/server/env";
import { sendTransactionalEmail } from "@/lib/server/email";
import { escapeHtml, sanitizeText } from "@/lib/server/html";
import { getClientIp, parseJsonBody, rejectInvalidJsonContentType, rejectInvalidOrigin } from "@/lib/server/http";
import { checkMemoryRateLimit, rateLimitWindowStart } from "@/lib/server/rate-limit";
import { getSupabaseAdmin } from "@/lib/server/supabase-admin";

export const runtime = "nodejs";
export const maxDuration = 10;

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

const contactPayloadSchema = z.object({
    submission_id: z.string().uuid().optional(),
    firstName: z.string().trim().min(1).max(100),
    lastName: z.string().trim().min(1).max(100),
    phone: z.string().trim().max(100).nullable().optional(),
    email: z.string().trim().email().max(320).transform((value) => value.toLowerCase()),
    message: z.string().trim().min(1).max(5000),
    company_website: z.string().trim().max(200).optional(),
});

type ContactPayload = z.infer<typeof contactPayloadSchema>;

const checkDatabaseRateLimit = async (
    supabase: SupabaseClient<Database>,
    customerEmail: string
) => {
    const since = rateLimitWindowStart(RATE_LIMIT_WINDOW_MS);
    const emailCheck = await supabase
        .from("contact_messages")
        .select("id", { count: "exact", head: true })
        .eq("email", customerEmail)
        .gte("created_at", since);

    if (emailCheck.error) return false;
    return (emailCheck.count || 0) < RATE_LIMIT_MAX;
};

const buildContactEmail = (payload: ContactPayload) => {
    const fullName = `${payload.firstName} ${payload.lastName}`;
    const safe = {
        fullName: escapeHtml(fullName),
        email: escapeHtml(payload.email),
        phone: escapeHtml(sanitizeText(payload.phone) || "Not provided"),
        message: escapeHtml(payload.message).replace(/\n/g, "<br/>"),
    };

    const text = [
        "New Contact Form Submission",
        "",
        `Name: ${fullName}`,
        `Email: ${payload.email}`,
        `Phone: ${sanitizeText(payload.phone) || "Not provided"}`,
        "",
        "Message:",
        payload.message,
    ].join("\n");

    const html = `
      <h2>New Contact Form Submission</h2>
      <table style="border-collapse:collapse; width:100%; margin-bottom:20px;">
        <tr><td style="padding:6px; font-weight:bold; width:35%;">Name:</td><td style="padding:6px;">${safe.fullName}</td></tr>
        <tr><td style="padding:6px; font-weight:bold;">Email:</td><td style="padding:6px;"><a href="mailto:${safe.email}">${safe.email}</a></td></tr>
        <tr><td style="padding:6px; font-weight:bold;">Phone:</td><td style="padding:6px;">${safe.phone}</td></tr>
      </table>
      <h3>Message</h3>
      <p style="padding:10px; background:#f8f9fa; border-radius:4px;">${safe.message}</p>
      <p style="color:#64748b; font-size:12px;">This email was generated from the InVitvo Pharmaceuticals website contact form.</p>
    `;

    return { text, html, fullName };
};

export async function POST(request: NextRequest) {
    const originError = rejectInvalidOrigin(request);
    if (originError) return originError;

    const contentTypeError = rejectInvalidJsonContentType(request);
    if (contentTypeError) return contentTypeError;

    const clientIp = getClientIp(request);
    if (clientIp && !checkMemoryRateLimit(`contact:${clientIp}`, { windowMs: RATE_LIMIT_WINDOW_MS, max: RATE_LIMIT_MAX })) {
        return NextResponse.json({ error: "Too many contact submissions. Please try again later." }, { status: 429 });
    }

    const { payload: rawPayload, error: parseError } = await parseJsonBody<unknown>(request);
    if (parseError) return parseError;

    const validation = contactPayloadSchema.safeParse(rawPayload);
    if (!validation.success) {
        const rawCompanyWebsite =
            rawPayload && typeof rawPayload === "object" && "company_website" in rawPayload
                ? sanitizeText((rawPayload as { company_website?: unknown }).company_website)
                : "";
        if (rawCompanyWebsite) return NextResponse.json({ success: true });
        return NextResponse.json({ error: "Check required fields and try again." }, { status: 400 });
    }

    const payload = validation.data;
    if (payload.company_website) return NextResponse.json({ success: true });

    const supabase = getSupabaseAdmin();
    const databaseRateLimitOk = await checkDatabaseRateLimit(supabase, payload.email);
    if (!databaseRateLimitOk) {
        return NextResponse.json({ error: "Too many contact submissions. Please try again later." }, { status: 429 });
    }

    const contactId = payload.submission_id || crypto.randomUUID();
    const insertPayload: TablesInsert<"contact_messages"> = {
        id: contactId,
        first_name: payload.firstName,
        last_name: payload.lastName,
        email: payload.email,
        phone: sanitizeText(payload.phone) || null,
        message: payload.message,
    };

    const { error: dbError } = await supabase.from("contact_messages").insert(insertPayload);
    if (dbError && dbError.code !== "23505") {
        return NextResponse.json({ error: "Unable to save message. Please email info@invitvo.com." }, { status: 500 });
    }

    const email = buildContactEmail(payload);
    try {
        await sendTransactionalEmail({
            from: "InVitvo Contact <info@invitvo.com>",
            to: [getNotifyEmail()],
            subject: `New Contact Form Submission from ${email.fullName}`,
            html: email.html,
            text: email.text,
            replyTo: payload.email,
        });
    } catch {
        return NextResponse.json(
            { error: "Message was saved, but notification failed. Please email info@invitvo.com." },
            { status: 502 }
        );
    }

    return NextResponse.json({ success: true, contact_id: contactId });
}
