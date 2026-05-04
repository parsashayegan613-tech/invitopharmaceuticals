import { requireServerEnv } from "@/lib/server/env";

type SendTransactionalEmailInput = {
    from: string;
    to: string[];
    subject: string;
    html: string;
    text: string;
    replyTo: string;
};

export class EmailDeliveryError extends Error {
    constructor() {
        super("Email delivery failed");
        this.name = "EmailDeliveryError";
    }
}

export const sendTransactionalEmail = async ({
    from,
    to,
    subject,
    html,
    text,
    replyTo,
}: SendTransactionalEmailInput) => {
    const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${requireServerEnv("RESEND_API_KEY")}`,
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

    if (!response.ok) {
        throw new EmailDeliveryError();
    }
};
