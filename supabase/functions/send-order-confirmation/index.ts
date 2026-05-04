import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

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
      institution: sanitize(rawOrder.institution, 250),
    };

    if (!order.customer_name || !order.customer_email || !order.product_name) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const amount = order.custom_quantity || order.product_amount;
    const safe = Object.fromEntries(
      Object.entries(order).map(([key, value]) => [key, escapeHtml(value || "Not provided")])
    );
    const safeAmount = escapeHtml(amount || "Not provided");

    const emailText = [
      `Dear ${order.customer_name},`,
      "",
      "We received your Request for Quotation. Our team will review it within 1-2 business days.",
      "",
      `Product: ${order.product_name}`,
      `Catalog #: ${order.product_catalog}`,
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

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; color:#1a2332;">
        <div style="text-align: center; padding: 20px 0 5px;">
          <img src="https://www.invitvo.com/logo-email.png" alt="InVitvo Pharmaceuticals Ltd." style="max-width: 180px; height: auto;" />
        </div>

        <h2>RFQ Received</h2>
        <p>Dear ${safe.customer_name},</p>
        <p>We received your Request for Quotation. Our team will review it within <strong>1-2 business days</strong>.</p>

        <table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
          <tr><td style="padding: 8px; font-weight: bold;">Product:</td><td style="padding: 8px;">${safe.product_name}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Catalog #:</td><td style="padding: 8px;">${safe.product_catalog}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Amount:</td><td style="padding: 8px;">${safeAmount}</td></tr>
        </table>

        <p>Shipping address, payment method, and purchase order details are collected only after quote acceptance.</p>
        <p style="font-size: 12px; color: #64748b;">All products are Research Use Only (RUO), not for human or veterinary use, and not intended to diagnose, treat, cure, or prevent any disease.</p>
        <p>Questions? Reply to this email or contact <a href="mailto:info@invitvo.com">info@invitvo.com</a>.</p>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "InVitvo Pharmaceuticals <info@invitvo.com>",
        to: [order.customer_email],
        subject: `RFQ received - ${order.product_name} (${order.product_catalog})`,
        html: emailHtml,
        text: emailText,
        reply_to: "info@invitvo.com",
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
