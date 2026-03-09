import type { Metadata } from "next";
import TermsOfServiceContent from "@/components/pages/TermsOfServiceContent";

export const metadata: Metadata = {
    title: "Terms of Service",
    description:
        "Review the Terms of Service for InVitvo Pharmaceuticals. All products are for research use only.",
    alternates: { canonical: "https://invitvo.com/terms-of-service" },
};

export default function TermsOfServicePage() {
    return <TermsOfServiceContent />;
}
