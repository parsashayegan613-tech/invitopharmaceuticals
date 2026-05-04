import type { Metadata } from "next";
import ContactUsContent from "@/components/pages/ContactUsContent";

export const metadata: Metadata = {
    title: "Contact Us",
    description:
        "Get in touch with InVitvo Pharmaceuticals. Located in Edmonton, Alberta. Reach us by phone, email, or our contact form for product inquiries and investor relations.",
    alternates: { canonical: "https://www.invitvo.com/contact-us" },
};

export default function ContactUsPage() {
    return <ContactUsContent />;
}
