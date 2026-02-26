import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const NOTIFY_EMAIL = "parsashayegan613@gmail.com";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
    // Handle CORS preflight
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        let order;
        try {
            const rawBody = await req.json();
            // Supabase functions.invoke wraps the body in {"record": ...} if it's a webhook, or just sends the payload directly
            order = rawBody;
        } catch (e) {
            console.error("Failed to parse request JSON", e);
            throw new Error("Invalid request body");
        }

        const emailHtml = `
      <h2 style="color:#2c3e50;">New Request for Quotation</h2>
      <hr style="border:1px solid #3498db;" />
      
      <h3 style="color:#2980b9;">Product Selection</h3>
      <table style="border-collapse:collapse; width:100%; margin-bottom:20px;">
        <tr><td style="padding:6px; font-weight:bold; width:40%;">Product:</td><td style="padding:6px;">${order.product_name}</td></tr>
        <tr style="background:#f8f9fa;"><td style="padding:6px; font-weight:bold;">Catalog #:</td><td style="padding:6px;">${order.product_catalog}</td></tr>
        <tr><td style="padding:6px; font-weight:bold;">Amount:</td><td style="padding:6px;">${order.product_amount}</td></tr>
        <tr style="background:#f8f9fa;"><td style="padding:6px; font-weight:bold;">Price:</td><td style="padding:6px;">${order.product_price}</td></tr>
        ${order.custom_quantity ? `<tr><td style="padding:6px; font-weight:bold;">Custom Quantity:</td><td style="padding:6px;">${order.custom_quantity}</td></tr>` : ""}
      </table>
      
      <h3 style="color:#2980b9;">Contact Information</h3>
      <table style="border-collapse:collapse; width:100%; margin-bottom:20px;">
        <tr><td style="padding:6px; font-weight:bold; width:40%;">Name:</td><td style="padding:6px;">${order.customer_name}</td></tr>
        <tr style="background:#f8f9fa;"><td style="padding:6px; font-weight:bold;">Email:</td><td style="padding:6px;"><a href="mailto:${order.customer_email}">${order.customer_email}</a></td></tr>
        <tr><td style="padding:6px; font-weight:bold;">Phone:</td><td style="padding:6px;">${order.customer_phone || "Not provided"}</td></tr>
        <tr style="background:#f8f9fa;"><td style="padding:6px; font-weight:bold;">Institution:</td><td style="padding:6px;">${order.institution}</td></tr>
        <tr><td style="padding:6px; font-weight:bold;">Department:</td><td style="padding:6px;">${order.department || "Not provided"}</td></tr>
        <tr style="background:#f8f9fa;"><td style="padding:6px; font-weight:bold;">PI Name:</td><td style="padding:6px;">${order.pi_name || "Not provided"}</td></tr>
      </table>
      
      <h3 style="color:#2980b9;">Shipping Address</h3>
      <p style="margin:5px 0; padding:10px; background:#f8f9fa; border-radius:4px;">
        ${order.street_address}<br/>
        ${order.city}, ${order.province} ${order.postal_code}<br/>
        ${order.country}
      </p>
      
      <h3 style="color:#2980b9;">Order Details</h3>
      <table style="border-collapse:collapse; width:100%; margin-bottom:20px;">
        <tr><td style="padding:6px; font-weight:bold; width:40%;">Intended Use:</td><td style="padding:6px;">${order.intended_use}</td></tr>
        <tr style="background:#f8f9fa;"><td style="padding:6px; font-weight:bold;">Payment Method:</td><td style="padding:6px;">${order.payment_method}</td></tr>
        ${order.po_number ? `<tr><td style="padding:6px; font-weight:bold;">PO Number:</td><td style="padding:6px;">${order.po_number}</td></tr>` : ""}
      </table>
      
      ${order.additional_notes ? `
      <h3 style="color:#2980b9;">Additional Notes</h3>
      <p style="padding:10px; background:#f8f9fa; border-radius:4px;">${order.additional_notes}</p>
      ` : ""}
      
      <hr style="border:1px solid #ecf0f1; margin-top:30px;" />
      <p style="color:#95a5a6; font-size:12px;">This email was automatically generated from the InVitvo Pharmaceuticals website order form.</p>
    `;

        const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
                from: "InVitvo Orders <info@invitvo.com>",
                to: [NOTIFY_EMAIL],
                subject: `New RFQ: ${order.product_name} (${order.product_catalog}) — ${order.customer_name}`,
                html: emailHtml,
                reply_to: order.customer_email,
            }),
        });

        const data = await res.json();

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
    } catch (error) {
        console.error("Edge function error:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }
});
