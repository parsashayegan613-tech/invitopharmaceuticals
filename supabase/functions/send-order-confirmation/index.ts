import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    let order;
    try {
      order = await req.json();
    } catch (e) {
      return new Response(JSON.stringify({ error: "Invalid request body" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const emailHtml = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #e8eaf0; padding: 30px; text-align: center;">
          <img src="https://invitvo.com/logo-email.png" alt="InVitvo Pharmaceuticals Ltd." style="max-width: 280px; height: auto;" />
        </div>
        
        <div style="padding: 30px; background: #ffffff;">
          <h2 style="color: #1a2332; margin-top: 0;">Thank You for Your Request</h2>
          <p style="color: #64748b; line-height: 1.6;">
            Dear ${order.customer_name},<br/><br/>
            We have received your Request for Quotation and our team will review it within <strong>1-2 business days</strong>. 
            You will receive a formal quotation with pricing and lead times at <strong>${order.customer_email}</strong>.
          </p>
          
          <hr style="border: 1px solid #e2e8f0; margin: 25px 0;" />
          
          <h3 style="color: #1a2332; margin-bottom: 10px;">Order Summary</h3>
          <table style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
            <tr style="background: #f8fafc;">
              <td style="padding: 10px; font-weight: bold; color: #475569; width: 40%;">Product:</td>
              <td style="padding: 10px; color: #1a2332;">${order.product_name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #475569;">Catalog #:</td>
              <td style="padding: 10px; color: #1a2332; font-family: monospace;">${order.product_catalog}</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="padding: 10px; font-weight: bold; color: #475569;">Amount:</td>
              <td style="padding: 10px; color: #1a2332;">${order.product_amount}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #475569;">Listed Price:</td>
              <td style="padding: 10px; color: #1a2332; font-weight: bold;">${order.product_price}</td>
            </tr>
            ${order.custom_quantity ? `
            <tr style="background: #f8fafc;">
              <td style="padding: 10px; font-weight: bold; color: #475569;">Custom Quantity:</td>
              <td style="padding: 10px; color: #1a2332;">${order.custom_quantity}</td>
            </tr>` : ""}
          </table>
          
          <h3 style="color: #1a2332; margin-bottom: 10px;">Shipping To</h3>
          <p style="color: #475569; background: #f8fafc; padding: 12px; border-radius: 6px; line-height: 1.6; margin: 0;">
            ${order.customer_name}<br/>
            ${order.institution}<br/>
            ${order.street_address}<br/>
            ${order.city}, ${order.province} ${order.postal_code}<br/>
            ${order.country}
          </p>
          
          <hr style="border: 1px solid #e2e8f0; margin: 25px 0;" />
          
          <h3 style="color: #1a2332; margin-bottom: 15px;">What Happens Next?</h3>
          <table style="width: 100%;">
            <tr>
              <td style="padding: 8px 12px; vertical-align: top; width: 30px; color: #0f766e; font-weight: bold;">1.</td>
              <td style="padding: 8px 0; color: #475569;">Our team reviews your request (1-2 business days)</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; vertical-align: top; color: #0f766e; font-weight: bold;">2.</td>
              <td style="padding: 8px 0; color: #475569;">You'll receive a formal quotation with final pricing</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; vertical-align: top; color: #0f766e; font-weight: bold;">3.</td>
              <td style="padding: 8px 0; color: #475569;">Confirm your order and submit payment or PO</td>
            </tr>
          </table>
        </div>
        
        <div style="background: #f1f5f9; padding: 20px; text-align: center;">
          <p style="color: #64748b; font-size: 13px; margin: 0 0 5px;">
            Questions? Reply to this email or contact us at <a href="mailto:info@invitvo.com" style="color: #0f766e;">info@invitvo.com</a>
          </p>
          <p style="color: #94a3b8; font-size: 11px; margin: 0;">
            © ${new Date().getFullYear()} InVitvo Pharmaceuticals Ltd. | Edmonton, AB, Canada
          </p>
          <p style="color: #cbd5e1; font-size: 10px; margin: 8px 0 0;">
            All products are for Research Use Only (RUO). Not for human or veterinary use.
          </p>
        </div>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "InVitvo Pharmaceuticals <onboarding@resend.dev>",
        to: [order.customer_email],
        subject: `Order Confirmation — ${order.product_name} (${order.product_catalog})`,
        html: emailHtml,
        reply_to: "info@invitvo.com",
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
  } catch (error: any) {
    console.error("Edge function error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
