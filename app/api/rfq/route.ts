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
import { productCatalog, productIds, type ProductCatalogItem } from "@/lib/products";

export const runtime = "nodejs";
export const maxDuration = 10;

const freeEmailDomains = new Set([
    "gmail.com",
    "googlemail.com",
    "hotmail.com",
    "outlook.com",
    "live.com",
    "msn.com",
    "yahoo.com",
    "icloud.com",
    "aol.com",
    "proton.me",
    "protonmail.com",
]);

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

const rfqPayloadSchema = z
    .object({
        submission_id: z.string().uuid().optional(),
        product_id: z.enum(productIds),
        customer_name: z.string().trim().min(1).max(200),
        customer_email: z.string().trim().email().max(320).transform((value) => value.toLowerCase()),
        customer_phone: z.string().trim().max(100).nullable().optional(),
        institution: z.string().trim().min(1).max(250),
        department: z.string().trim().max(250).nullable().optional(),
        pi_name: z.string().trim().max(250).nullable().optional(),
        intended_use: z.string().trim().min(1).max(3000),
        custom_quantity: z.string().trim().max(100).nullable().optional(),
        how_heard: z.string().trim().max(150).nullable().optional(),
        additional_notes: z.string().trim().max(5000).nullable().optional(),
        ruo_acknowledged: z.literal(true),
        qualified_acknowledged: z.literal(true),
        terms_accepted: z.literal(true),
        company_website: z.string().trim().max(200).optional(),
        form_started_at: z.string().trim().max(80).nullable().optional(),
    })
    .superRefine((payload, context) => {
        if (payload.product_id === "terrein-custom" && !payload.custom_quantity?.trim()) {
            context.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["custom_quantity"],
                message: "Custom quantity is required.",
            });
        }
    });

type RfqPayload = z.infer<typeof rfqPayloadSchema>;

const getEmailDomain = (email: string) => email.toLowerCase().split("@")[1] || "";

const checkDatabaseRateLimit = async (
    supabase: SupabaseClient<Database>,
    customerEmail: string,
    clientIp: string | null
) => {
    const since = rateLimitWindowStart(RATE_LIMIT_WINDOW_MS);
    const emailCheck = await supabase
        .from("orders")
        .select("id", { count: "exact", head: true })
        .eq("customer_email", customerEmail)
        .gte("created_at", since);

    if (emailCheck.error) return false;
    if ((emailCheck.count || 0) >= RATE_LIMIT_MAX) return false;

    if (!clientIp) return true;

    const ipCheck = await supabase
        .from("orders")
        .select("id", { count: "exact", head: true })
        .eq("client_ip", clientIp)
        .gte("created_at", since);

    if (ipCheck.error) return false;
    return (ipCheck.count || 0) < RATE_LIMIT_MAX;
};

const normalizeOptional = (value: string | null | undefined) => {
    const sanitized = sanitizeText(value);
    return sanitized || null;
};

const buildInternalEmail = (
    payload: RfqPayload,
    product: ProductCatalogItem,
    now: string,
    freeEmailWarning: string
) => {
    const safe = {
        productName: escapeHtml(product.name),
        productCatalog: escapeHtml(product.catalog),
        productAmount: escapeHtml(product.amount),
        productPrice: escapeHtml(product.price),
        customQuantity: escapeHtml(normalizeOptional(payload.custom_quantity) || ""),
        customerName: escapeHtml(payload.customer_name),
        customerEmail: escapeHtml(payload.customer_email),
        customerPhone: escapeHtml(normalizeOptional(payload.customer_phone) || "Not provided"),
        institution: escapeHtml(payload.institution),
        department: escapeHtml(normalizeOptional(payload.department) || "Not provided"),
        piName: escapeHtml(normalizeOptional(payload.pi_name) || "Not provided"),
        intendedUse: escapeHtml(payload.intended_use).replace(/\n/g, "<br/>"),
        howHeard: escapeHtml(normalizeOptional(payload.how_heard) || "Not provided"),
        additionalNotes: escapeHtml(normalizeOptional(payload.additional_notes) || "Not provided").replace(/\n/g, "<br/>"),
        freeEmailWarning: escapeHtml(freeEmailWarning),
    };

    const text = [
        "New Request for Quotation",
        "",
        `Product: ${product.name}`,
        `Catalog #: ${product.catalog}`,
        `Amount: ${product.amount}`,
        `Listed price: ${product.price}`,
        payload.custom_quantity ? `Custom quantity: ${payload.custom_quantity}` : "",
        "",
        `Name: ${payload.customer_name}`,
        `Email: ${payload.customer_email}`,
        `Phone: ${normalizeOptional(payload.customer_phone) || "Not provided"}`,
        `Institution: ${payload.institution}`,
        `Department: ${normalizeOptional(payload.department) || "Not provided"}`,
        `PI name: ${normalizeOptional(payload.pi_name) || "Not provided"}`,
        "",
        `Intended research application: ${payload.intended_use}`,
        `How heard: ${normalizeOptional(payload.how_heard) || "Not provided"}`,
        `Additional notes: ${normalizeOptional(payload.additional_notes) || "Not provided"}`,
        `Email qualification note: ${freeEmailWarning}`,
        "",
        `RUO acknowledged at: ${now}`,
        `Qualified researcher acknowledged at: ${now}`,
        `Terms accepted at: ${now}`,
        "",
        "All products are Research Use Only (RUO), not for human or veterinary use, and not intended to diagnose, treat, cure, or prevent any disease.",
    ].filter(Boolean).join("\n");

    const html = `
      <h2>New Request for Quotation</h2>
      <h3>Product Selection</h3>
      <table style="border-collapse:collapse; width:100%;">
        <tr><td style="padding:6px; font-weight:bold;">Product:</td><td style="padding:6px;">${safe.productName}</td></tr>
        <tr><td style="padding:6px; font-weight:bold;">Catalog #:</td><td style="padding:6px;">${safe.productCatalog}</td></tr>
        <tr><td style="padding:6px; font-weight:bold;">Amount:</td><td style="padding:6px;">${safe.productAmount}</td></tr>
        <tr><td style="padding:6px; font-weight:bold;">Listed Price:</td><td style="padding:6px;">${safe.productPrice}</td></tr>
        ${payload.custom_quantity ? `<tr><td style="padding:6px; font-weight:bold;">Custom Quantity:</td><td style="padding:6px;">${safe.customQuantity}</td></tr>` : ""}
      </table>

      <h3>Contact and Institution</h3>
      <table style="border-collapse:collapse; width:100%;">
        <tr><td style="padding:6px; font-weight:bold;">Name:</td><td style="padding:6px;">${safe.customerName}</td></tr>
        <tr><td style="padding:6px; font-weight:bold;">Email:</td><td style="padding:6px;"><a href="mailto:${safe.customerEmail}">${safe.customerEmail}</a></td></tr>
        <tr><td style="padding:6px; font-weight:bold;">Phone:</td><td style="padding:6px;">${safe.customerPhone}</td></tr>
        <tr><td style="padding:6px; font-weight:bold;">Institution:</td><td style="padding:6px;">${safe.institution}</td></tr>
        <tr><td style="padding:6px; font-weight:bold;">Department:</td><td style="padding:6px;">${safe.department}</td></tr>
        <tr><td style="padding:6px; font-weight:bold;">PI Name:</td><td style="padding:6px;">${safe.piName}</td></tr>
      </table>

      <h3>Research Qualification</h3>
      <p><strong>Intended research application:</strong><br/>${safe.intendedUse}</p>
      <p><strong>How heard:</strong> ${safe.howHeard}</p>
      <p><strong>Additional notes:</strong><br/>${safe.additionalNotes}</p>
      <p><strong>Email qualification note:</strong> ${safe.freeEmailWarning}</p>

      <h3>Compliance Acknowledgements</h3>
      <ul>
        <li>RUO acknowledged at: ${now}</li>
        <li>Qualified researcher/entity acknowledged at: ${now}</li>
        <li>Terms accepted at: ${now}</li>
      </ul>
      <p style="font-size:12px; color:#64748b;">All products are Research Use Only (RUO), not for human or veterinary use, and not intended to diagnose, treat, cure, or prevent any disease.</p>
    `;

    return { text, html };
};

const buildCustomerEmail = (
    payload: RfqPayload,
    product: ProductCatalogItem
) => {
    const amount = normalizeOptional(payload.custom_quantity) || product.amount;
    const safeName = escapeHtml(payload.customer_name);
    const safeProductName = escapeHtml(product.name);
    const safeCatalog = escapeHtml(product.catalog);
    const safeAmount = escapeHtml(amount);

    const text = [
        `Dear ${payload.customer_name},`,
        "",
        "We received your Request for Quotation. Our team will review it within 1-2 business days.",
        "",
        `Product: ${product.name}`,
        `Catalog #: ${product.catalog}`,
        `Amount: ${amount}`,
        "",
        "Shipping address, payment method, and purchase order details are collected only after quote acceptance.",
        "",
        "All products are Research Use Only (RUO), not for human or veterinary use, and not intended to diagnose, treat, cure, or prevent any disease.",
        "",
        "Questions? Reply to this email or contact info@invitvo.com.",
        "",
        "InVitvo Pharmaceuticals Ltd.",
        "Edmonton, AB, Canada",
    ].join("\n");

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; color:#1a2332;">
        <div style="text-align:center; padding:20px 0 5px;">
          <img src="https://www.invitvo.com/logo-email.png" alt="InVitvo Pharmaceuticals Ltd." style="max-width:180px; height:auto;" />
        </div>
        <h2>RFQ Received</h2>
        <p>Dear ${safeName},</p>
        <p>We received your Request for Quotation. Our team will review it within <strong>1-2 business days</strong>.</p>
        <table style="border-collapse:collapse; width:100%; margin:20px 0;">
          <tr><td style="padding:8px; font-weight:bold;">Product:</td><td style="padding:8px;">${safeProductName}</td></tr>
          <tr><td style="padding:8px; font-weight:bold;">Catalog #:</td><td style="padding:8px;">${safeCatalog}</td></tr>
          <tr><td style="padding:8px; font-weight:bold;">Amount:</td><td style="padding:8px;">${safeAmount}</td></tr>
        </table>
        <p>Shipping address, payment method, and purchase order details are collected only after quote acceptance.</p>
        <p style="font-size:12px; color:#64748b;">All products are Research Use Only (RUO), not for human or veterinary use, and not intended to diagnose, treat, cure, or prevent any disease.</p>
        <p>Questions? Reply to this email or contact <a href="mailto:info@invitvo.com">info@invitvo.com</a>.</p>
      </div>
    `;

    return { text, html };
};

export async function POST(request: NextRequest) {
    const originError = rejectInvalidOrigin(request);
    if (originError) return originError;

    const contentTypeError = rejectInvalidJsonContentType(request);
    if (contentTypeError) return contentTypeError;

    const clientIp = getClientIp(request);
    if (clientIp && !checkMemoryRateLimit(`rfq:${clientIp}`, { windowMs: RATE_LIMIT_WINDOW_MS, max: RATE_LIMIT_MAX })) {
        return NextResponse.json({ error: "Too many RFQ submissions. Please try again later." }, { status: 429 });
    }

    const { payload: rawPayload, error: parseError } = await parseJsonBody<unknown>(request);
    if (parseError) return parseError;

    const validation = rfqPayloadSchema.safeParse(rawPayload);
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

    const product = productCatalog[payload.product_id];
    const supabase = getSupabaseAdmin();

    const databaseRateLimitOk = await checkDatabaseRateLimit(supabase, payload.customer_email, clientIp);
    if (!databaseRateLimitOk) {
        return NextResponse.json({ error: "Too many RFQ submissions. Please try again later." }, { status: 429 });
    }

    const now = new Date().toISOString();
    const submissionId = payload.submission_id || crypto.randomUUID();
    const emailDomain = getEmailDomain(payload.customer_email);
    const freeEmailWarning = freeEmailDomains.has(emailDomain)
        ? "Free email domain used. Consider extra supplier qualification before quoting."
        : "Institutional or organizational email domain supplied.";

    const insertPayload: TablesInsert<"orders"> = {
        id: submissionId,
        product_name: product.name,
        product_catalog: product.catalog,
        product_amount: product.amount,
        product_price: product.price,
        custom_quantity: normalizeOptional(payload.custom_quantity),
        customer_name: payload.customer_name,
        customer_email: payload.customer_email,
        customer_phone: normalizeOptional(payload.customer_phone),
        institution: payload.institution,
        department: normalizeOptional(payload.department),
        pi_name: normalizeOptional(payload.pi_name),
        intended_use: payload.intended_use,
        additional_notes: normalizeOptional(payload.additional_notes),
        how_heard: normalizeOptional(payload.how_heard),
        ruo_acknowledged_at: now,
        qualified_acknowledged_at: now,
        terms_accepted_at: now,
        form_started_at: normalizeOptional(payload.form_started_at),
        client_ip: clientIp,
        user_agent: normalizeOptional(request.headers.get("user-agent")),
        street_address: null,
        city: null,
        province: null,
        postal_code: null,
        country: null,
        payment_method: null,
        po_number: null,
    };

    const { error: dbError } = await supabase.from("orders").insert(insertPayload);
    if (dbError && dbError.code !== "23505") {
        return NextResponse.json({ error: "Unable to save RFQ. Please email info@invitvo.com." }, { status: 500 });
    }

    const internalEmail = buildInternalEmail(payload, product, now, freeEmailWarning);
    const customerEmail = buildCustomerEmail(payload, product);

    const [internalResult, customerResult] = await Promise.allSettled([
        sendTransactionalEmail({
            from: "InVitvo Orders <orders@invitvo.com>",
            to: [getNotifyEmail()],
            subject: `New RFQ: ${product.name} (${product.catalog}) - ${payload.customer_name}`,
            html: internalEmail.html,
            text: internalEmail.text,
            replyTo: payload.customer_email,
        }),
        sendTransactionalEmail({
            from: "InVitvo Pharmaceuticals <info@invitvo.com>",
            to: [payload.customer_email],
            subject: `RFQ received - ${product.name} (${product.catalog})`,
            html: customerEmail.html,
            text: customerEmail.text,
            replyTo: "info@invitvo.com",
        }),
    ]);

    if (internalResult.status === "rejected" || customerResult.status === "rejected") {
        return NextResponse.json(
            { error: "RFQ was saved, but email confirmation failed. Please email info@invitvo.com." },
            { status: 502 }
        );
    }

    return NextResponse.json({ success: true, rfq_id: submissionId });
}
