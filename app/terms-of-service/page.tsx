import TermsOfServiceContent from "@/components/pages/TermsOfServiceContent";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Terms of Service",
    description: "Review InVitvo Pharmaceuticals terms for RUO research compounds, quotations, and website use.",
    path: "/terms-of-service",
});

export default function TermsOfServicePage() {
    return <TermsOfServiceContent />;
}
