import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const NOTIFY_EMAIL = "info@invitvo.com";

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
        let contact;
        try {
            const rawBody = await req.json();
            contact = rawBody;
        } catch (e) {
            return new Response(JSON.stringify({ error: "Invalid request body" }), {
                status: 400,
                headers: { ...corsHeaders, "Content-Type": "application/json" }
            });
        }

        // Basic input validation and sanitization to prevent massive payload abuse
        if (!contact || typeof contact !== 'object') {
            return new Response(JSON.stringify({ error: "Invalid payload" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }

        const sanitize = (str: any) => typeof str === 'string' ? str.slice(0, 1000).replace(/</g, "&lt;").replace(/>/g, "&gt;") : '';
        contact.firstName = sanitize(contact.firstName);
        contact.lastName = sanitize(contact.lastName);
        contact.email = sanitize(contact.email);
        contact.phone = sanitize(contact.phone);
        contact.message = typeof contact.message === 'string' ? contact.message.slice(0, 5000).replace(/</g, "&lt;").replace(/>/g, "&gt;") : '';

        if (!contact.firstName || !contact.email || !contact.message) {
            return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }
        const emailText = [
            "New Contact Form Submission",
            "",
            `Name: ${contact.firstName} ${contact.lastName}`,
            `Email: ${contact.email}`,
            `Phone: ${contact.phone || "Not provided"}`,
            "",
            "Message:",
            contact.message,
        ].join("\n");

        const emailHtml = `
      <h2 style="color:#2c3e50;">New Contact Form Submission</h2>
      <hr style="border:1px solid #3498db;" />
      
      <table style="border-collapse:collapse; width:100%; margin-bottom:20px;">
        <tr><td style="padding:6px; font-weight:bold; width:40%;">Name:</td><td style="padding:6px;">${contact.firstName} ${contact.lastName}</td></tr>
        <tr style="background:#f8f9fa;"><td style="padding:6px; font-weight:bold;">Email:</td><td style="padding:6px;"><a href="mailto:${contact.email}">${contact.email}</a></td></tr>
        <tr><td style="padding:6px; font-weight:bold;">Phone:</td><td style="padding:6px;">${contact.phone || "Not provided"}</td></tr>
      </table>
      
      <h3 style="color:#2980b9;">Message</h3>
      <p style="padding:10px; background:#f8f9fa; border-radius:4px;">${contact.message}</p>
      
      <hr style="border:1px solid #ecf0f1; margin-top:30px;" />
      <p style="color:#95a5a6; font-size:12px;">This email was automatically generated from the InVitvo Pharmaceuticals website contact form.</p>
    `;

        const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
                from: "InVitvo Contact <notifications@invitvo.com>",
                to: [NOTIFY_EMAIL],
                subject: `New Contact Form Submission from ${contact.firstName} ${contact.lastName}`,
                html: emailHtml,
                text: emailText,
                reply_to: contact.email,
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
