import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL || "https://xquntpgxrurxjbpebdhn.supabase.co";
const SUPABASE_KEY =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    "sb_publishable_vbtS8JJiayCjgQjZsQH32g_9apIxi4s";
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const NOTIFY_EMAIL = process.env.RFQ_NOTIFY_EMAIL || "info@invitvo.com";

const products = {
    "terrein-5mg": { name: "Terrein >95%", amount: "5 mg", price: "C$450", catalog: "INV-TER-005" },
    "terrein-10mg": { name: "Terrein >95%", amount: "10 mg", price: "C$800", catalog: "INV-TER-010" },
    "terrein-custom": { name: "Terrein >95%", amount: "Custom", price: "Quote", catalog: "INV-TER-XXX" },
} as const;

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

const rateLimitStore: Map<string, { count: number; resetAt: number }> =
    ((globalThis as any).__invitvoRfqRateLimit ??= new Map());
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

type RfqPayload = {
    product_id?: keyof typeof products;
    customer_name?: string;
    customer_email?: string;
    customer_phone?: string | null;
    institution?: string;
    department?: string | null;
    pi_name?: string | null;
    intended_use?: string;
    custom_quantity?: string | null;
    how_heard?: string | null;
    additional_notes?: string | null;
    ruo_acknowledged?: boolean;
    qualified_acknowledged?: boolean;
    terms_accepted?: boolean;
    company_website?: string;
    form_started_at?: string;
};

const sanitize = (value: unknown, max = 1000) =>
    typeof value === "string" ? value.trim().slice(0, max) : "";

const escapeHtml = (value: string) =>
    value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const getEmailDomain = (email: string) => email.toLowerCase().split("@")[1] || "";

const getClientIp = (request: NextRequest) => {
    const forwardedFor = request.headers.get("x-forwarded-for");
    if (forwardedFor) return forwardedFor.split(",")[0].trim();
    return request.headers.get("x-real-ip") || "unknown";
};

const checkRateLimit = (key: string) => {
    const now = Date.now();
    const current = rateLimitStore.get(key);

    if (!current || current.resetAt <= now) {
        rateLimitStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
        return true;
    }

    current.count += 1;
    return current.count <= RATE_LIMIT_MAX;
};

const sendEmail = async ({
    from,
    to,
    subject,
    html,
    text,
    replyTo,
}: {
    from: string;
    to: string[];
    subject: string;
    html: string;
    text: string;
    replyTo: string;
}) => {
    if (!RESEND_API_KEY) {
        throw new Error("RESEND_API_KEY is not configured");
    }

    const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
            from,
            to,
            subject,
            html,
            text,
            reply_to: replyTo,
        }),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        console.error("Resend error:", data);
        throw new Error("Email delivery failed");
    }
};

export async function POST(request: NextRequest) {
    const clientIp = getClientIp(request);
    if (!checkRateLimit(clientIp)) {
        return NextResponse.json({ error: "Too many RFQ submissions. Please try again later." }, { status: 429 });
    }

    let payload: RfqPayload;
    try {
        payload = await request.json();
    } catch {
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    if (sanitize(payload.company_website)) {
        return NextResponse.json({ success: true });
    }

    const productId = payload.product_id;
    const product = productId ? products[productId] : null;
    const customerName = sanitize(payload.customer_name, 200);
    const customerEmail = sanitize(payload.customer_email, 320).toLowerCase();
    const customerPhone = sanitize(payload.customer_phone, 100) || null;
    const institution = sanitize(payload.institution, 250);
    const department = sanitize(payload.department, 250) || null;
    const piName = sanitize(payload.pi_name, 250) || null;
    const intendedUse = sanitize(payload.intended_use, 3000);
    const customQuantity = sanitize(payload.custom_quantity, 100) || null;
    const howHeard = sanitize(payload.how_heard, 150) || null;
    const additionalNotes = sanitize(payload.additional_notes, 5000) || null;
    const now = new Date().toISOString();
    const formStartedAt = sanitize(payload.form_started_at, 80) || null;

    const errors: string[] = [];
    if (!product) errors.push("Select a valid product.");
    if (!customerName) errors.push("Name is required.");
    if (!isValidEmail(customerEmail)) errors.push("A valid email is required.");
    if (!institution) errors.push("Institution is required.");
    if (!intendedUse) errors.push("Intended research application is required.");
    if (productId === "terrein-custom" && !customQuantity) errors.push("Custom quantity is required.");
    if (!payload.ruo_acknowledged) errors.push("RUO acknowledgement is required.");
    if (!payload.qualified_acknowledged) errors.push("Qualified researcher acknowledgement is required.");
    if (!payload.terms_accepted) errors.push("Terms acceptance is required.");

    if (errors.length > 0) {
        return NextResponse.json({ error: errors.join(" ") }, { status: 400 });
    }

    const emailDomain = getEmailDomain(customerEmail);
    const freeEmailWarning = freeEmailDomains.has(emailDomain)
        ? "Free email domain used. Consider extra supplier qualification before quoting."
        : "Institutional or organizational email domain supplied.";

    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
        auth: { persistSession: false, autoRefreshToken: false },
    });

    const insertPayload = {
        product_name: product!.name,
        product_catalog: product!.catalog,
        product_amount: product!.amount,
        product_price: product!.price,
        custom_quantity: customQuantity,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        institution,
        department,
        pi_name: piName,
        intended_use: intendedUse,
        additional_notes: additionalNotes,
        how_heard: howHeard,
        ruo_acknowledged_at: now,
        qualified_acknowledged_at: now,
        terms_accepted_at: now,
        form_started_at: formStartedAt,
        client_ip: clientIp === "unknown" ? null : clientIp,
        user_agent: sanitize(request.headers.get("user-agent"), 500) || null,
        street_address: null,
        city: null,
        province: null,
        postal_code: null,
        country: null,
        payment_method: null,
        po_number: null,
    };

    const { error: dbError } = await supabase.from("orders").insert(insertPayload as any);
    if (dbError) {
        console.error("RFQ insert error:", dbError);
        return NextResponse.json({ error: "Unable to save RFQ. Please email info@invitvo.com." }, { status: 500 });
    }

    const safe = {
        productName: escapeHtml(product!.name),
        productCatalog: escapeHtml(product!.catalog),
        productAmount: escapeHtml(product!.amount),
        productPrice: escapeHtml(product!.price),
        customQuantity: escapeHtml(customQuantity || ""),
        customerName: escapeHtml(customerName),
        customerEmail: escapeHtml(customerEmail),
        customerPhone: escapeHtml(customerPhone || "Not provided"),
        institution: escapeHtml(institution),
        department: escapeHtml(department || "Not provided"),
        piName: escapeHtml(piName || "Not provided"),
        intendedUse: escapeHtml(intendedUse).replace(/\n/g, "<br/>"),
        howHeard: escapeHtml(howHeard || "Not provided"),
        additionalNotes: escapeHtml(additionalNotes || "Not provided").replace(/\n/g, "<br/>"),
        freeEmailWarning: escapeHtml(freeEmailWarning),
    };

    const internalText = [
        "New Request for Quotation",
        "",
        `Product: ${product!.name}`,
        `Catalog #: ${product!.catalog}`,
        `Amount: ${product!.amount}`,
        `Listed price: ${product!.price}`,
        customQuantity ? `Custom quantity: ${customQuantity}` : "",
        "",
        `Name: ${customerName}`,
        `Email: ${customerEmail}`,
        `Phone: ${customerPhone || "Not provided"}`,
        `Institution: ${institution}`,
        `Department: ${department || "Not provided"}`,
        `PI name: ${piName || "Not provided"}`,
        "",
        `Intended research application: ${intendedUse}`,
        `How heard: ${howHeard || "Not provided"}`,
        `Additional notes: ${additionalNotes || "Not provided"}`,
        `Email qualification note: ${freeEmailWarning}`,
        "",
        `RUO acknowledged at: ${now}`,
        `Qualified researcher acknowledged at: ${now}`,
        `Terms accepted at: ${now}`,
        "",
        "All products are Research Use Only (RUO), not for human or veterinary use, and not intended to diagnose, treat, cure, or prevent any disease.",
    ].filter(Boolean).join("\n");

    const internalHtml = `
      <h2>New Request for Quotation</h2>
      <h3>Product Selection</h3>
      <table style="border-collapse:collapse; width:100%;">
        <tr><td style="padding:6px; font-weight:bold;">Product:</td><td style="padding:6px;">${safe.productName}</td></tr>
        <tr><td style="padding:6px; font-weight:bold;">Catalog #:</td><td style="padding:6px;">${safe.productCatalog}</td></tr>
        <tr><td style="padding:6px; font-weight:bold;">Amount:</td><td style="padding:6px;">${safe.productAmount}</td></tr>
        <tr><td style="padding:6px; font-weight:bold;">Listed Price:</td><td style="padding:6px;">${safe.productPrice}</td></tr>
        ${customQuantity ? `<tr><td style="padding:6px; font-weight:bold;">Custom Quantity:</td><td style="padding:6px;">${safe.customQuantity}</td></tr>` : ""}
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

    await sendEmail({
        from: "InVitvo Orders <orders@invitvo.com>",
        to: [NOTIFY_EMAIL],
        subject: `New RFQ: ${product!.name} (${product!.catalog}) - ${customerName}`,
        html: internalHtml,
        text: internalText,
        replyTo: customerEmail,
    });

    const customerText = [
        `Dear ${customerName},`,
        "",
        "We received your Request for Quotation. Our team will review it within 1-2 business days.",
        "",
        `Product: ${product!.name}`,
        `Catalog #: ${product!.catalog}`,
        `Amount: ${customQuantity || product!.amount}`,
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

    const customerHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; color:#1a2332;">
        <div style="text-align:center; padding:20px 0 5px;">
          <img src="https://www.invitvo.com/logo-email.png" alt="InVitvo Pharmaceuticals Ltd." style="max-width:180px; height:auto;" />
        </div>
        <h2>RFQ Received</h2>
        <p>Dear ${safe.customerName},</p>
        <p>We received your Request for Quotation. Our team will review it within <strong>1-2 business days</strong>.</p>
        <table style="border-collapse:collapse; width:100%; margin:20px 0;">
          <tr><td style="padding:8px; font-weight:bold;">Product:</td><td style="padding:8px;">${safe.productName}</td></tr>
          <tr><td style="padding:8px; font-weight:bold;">Catalog #:</td><td style="padding:8px;">${safe.productCatalog}</td></tr>
          <tr><td style="padding:8px; font-weight:bold;">Amount:</td><td style="padding:8px;">${customQuantity ? safe.customQuantity : safe.productAmount}</td></tr>
        </table>
        <p>Shipping address, payment method, and purchase order details are collected only after quote acceptance.</p>
        <p style="font-size:12px; color:#64748b;">All products are Research Use Only (RUO), not for human or veterinary use, and not intended to diagnose, treat, cure, or prevent any disease.</p>
        <p>Questions? Reply to this email or contact <a href="mailto:info@invitvo.com">info@invitvo.com</a>.</p>
      </div>
    `;

    try {
        await sendEmail({
            from: "InVitvo Pharmaceuticals <info@invitvo.com>",
            to: [customerEmail],
            subject: `RFQ received - ${product!.name} (${product!.catalog})`,
            html: customerHtml,
            text: customerText,
            replyTo: "info@invitvo.com",
        });
    } catch (error) {
        console.error("Customer RFQ confirmation failed:", error);
    }

    return NextResponse.json({ success: true });
}
