import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const NOTIFY_EMAIL = Deno.env.get("RFQ_NOTIFY_EMAIL") || "info@invitvo.com";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
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

Deno.serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const rawOrder = await req.json();
        if (!rawOrder || typeof rawOrder !== "object") {
            return new Response(JSON.stringify({ error: "Invalid payload" }), {
                status: 400,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        const order = {
            product_name: sanitize(rawOrder.product_name, 200),
            product_catalog: sanitize(rawOrder.product_catalog, 80),
            product_amount: sanitize(rawOrder.product_amount, 100),
            product_price: sanitize(rawOrder.product_price, 100),
            custom_quantity: sanitize(rawOrder.custom_quantity, 100),
            customer_name: sanitize(rawOrder.customer_name, 200),
            customer_email: sanitize(rawOrder.customer_email, 320).toLowerCase(),
            customer_phone: sanitize(rawOrder.customer_phone, 100),
            institution: sanitize(rawOrder.institution, 250),
            department: sanitize(rawOrder.department, 250),
            pi_name: sanitize(rawOrder.pi_name, 250),
            intended_use: sanitize(rawOrder.intended_use, 3000),
            how_heard: sanitize(rawOrder.how_heard, 150),
            additional_notes: sanitize(rawOrder.additional_notes, 5000),
            ruo_acknowledged_at: sanitize(rawOrder.ruo_acknowledged_at, 80),
            qualified_acknowledged_at: sanitize(rawOrder.qualified_acknowledged_at, 80),
            terms_accepted_at: sanitize(rawOrder.terms_accepted_at, 80),
        };

        if (!order.product_name || !order.customer_name || !order.customer_email || !order.institution || !order.intended_use) {
            return new Response(JSON.stringify({ error: "Missing required fields" }), {
                status: 400,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        const safe = Object.fromEntries(
            Object.entries(order).map(([key, value]) => [key, escapeHtml(value || "Not provided")])
        );

        const emailText = [
            "New Request for Quotation",
            "",
            `Product: ${order.product_name}`,
            `Catalog #: ${order.product_catalog}`,
            `Amount: ${order.custom_quantity || order.product_amount}`,
            `Listed price: ${order.product_price}`,
            "",
            `Name: ${order.customer_name}`,
            `Email: ${order.customer_email}`,
            `Phone: ${order.customer_phone || "Not provided"}`,
            `Institution: ${order.institution}`,
            `Department: ${order.department || "Not provided"}`,
            `PI name: ${order.pi_name || "Not provided"}`,
            "",
            `Intended research application: ${order.intended_use}`,
            `How heard: ${order.how_heard || "Not provided"}`,
            `Additional notes: ${order.additional_notes || "Not provided"}`,
            "",
            `RUO acknowledged at: ${order.ruo_acknowledged_at || "Not provided"}`,
            `Qualified researcher acknowledged at: ${order.qualified_acknowledged_at || "Not provided"}`,
            `Terms accepted at: ${order.terms_accepted_at || "Not provided"}`,
            "",
            "All products are Research Use Only (RUO), not for human or veterinary use, and not intended to diagnose, treat, cure, or prevent any disease.",
        ].join("\n");

        const emailHtml = `
          <h2>New Request for Quotation</h2>
          <h3>Product Selection</h3>
          <table style="border-collapse:collapse; width:100%; margin-bottom:20px;">
            <tr><td style="padding:6px; font-weight:bold;">Product:</td><td style="padding:6px;">${safe.product_name}</td></tr>
            <tr><td style="padding:6px; font-weight:bold;">Catalog #:</td><td style="padding:6px;">${safe.product_catalog}</td></tr>
            <tr><td style="padding:6px; font-weight:bold;">Amount:</td><td style="padding:6px;">${order.custom_quantity ? safe.custom_quantity : safe.product_amount}</td></tr>
            <tr><td style="padding:6px; font-weight:bold;">Listed Price:</td><td style="padding:6px;">${safe.product_price}</td></tr>
          </table>

          <h3>Contact and Institution</h3>
          <table style="border-collapse:collapse; width:100%; margin-bottom:20px;">
            <tr><td style="padding:6px; font-weight:bold;">Name:</td><td style="padding:6px;">${safe.customer_name}</td></tr>
            <tr><td style="padding:6px; font-weight:bold;">Email:</td><td style="padding:6px;"><a href="mailto:${safe.customer_email}">${safe.customer_email}</a></td></tr>
            <tr><td style="padding:6px; font-weight:bold;">Phone:</td><td style="padding:6px;">${safe.customer_phone}</td></tr>
            <tr><td style="padding:6px; font-weight:bold;">Institution:</td><td style="padding:6px;">${safe.institution}</td></tr>
            <tr><td style="padding:6px; font-weight:bold;">Department:</td><td style="padding:6px;">${safe.department}</td></tr>
            <tr><td style="padding:6px; font-weight:bold;">PI Name:</td><td style="padding:6px;">${safe.pi_name}</td></tr>
          </table>

          <h3>Research Qualification</h3>
          <p><strong>Intended research application:</strong><br/>${safe.intended_use.replace(/\n/g, "<br/>")}</p>
          <p><strong>How heard:</strong> ${safe.how_heard}</p>
          <p><strong>Additional notes:</strong><br/>${safe.additional_notes.replace(/\n/g, "<br/>")}</p>

          <h3>Compliance Acknowledgements</h3>
          <ul>
            <li>RUO acknowledged at: ${safe.ruo_acknowledged_at}</li>
            <li>Qualified researcher/entity acknowledged at: ${safe.qualified_acknowledged_at}</li>
            <li>Terms accepted at: ${safe.terms_accepted_at}</li>
          </ul>
          <p style="color:#64748b; font-size:12px;">All products are Research Use Only (RUO), not for human or veterinary use, and not intended to diagnose, treat, cure, or prevent any disease.</p>
        `;

        const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
                from: "InVitvo Orders <orders@invitvo.com>",
                to: [NOTIFY_EMAIL],
                subject: `New RFQ: ${order.product_name} (${order.product_catalog}) - ${order.customer_name}`,
                html: emailHtml,
                text: emailText,
                reply_to: order.customer_email,
            }),
        });

        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
            console.error("Resend error:", data);
            return new Response(JSON.stringify({ error: data }), {
                status: 400,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify({ success: true }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    } catch (error: any) {
        console.error("Edge function error:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }
});
