import ContactUsContent from "@/components/pages/ContactUsContent";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Contact Us",
    description: "Contact InVitvo Pharmaceuticals in Edmonton for RUO research compound quotes and product inquiries.",
    path: "/contact-us",
});

export default function ContactUsPage() {
    return <ContactUsContent />;
}
