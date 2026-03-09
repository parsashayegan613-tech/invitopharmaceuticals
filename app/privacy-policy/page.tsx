import type { Metadata } from "next";
import PrivacyPolicyContent from "@/components/pages/PrivacyPolicyContent";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description:
        "Read InVitvo Pharmaceuticals' Privacy Policy to understand how we collect, use, and protect your personal information.",
    alternates: { canonical: "https://invitvo.com/privacy-policy" },
};

export default function PrivacyPolicyPage() {
    return <PrivacyPolicyContent />;
}
