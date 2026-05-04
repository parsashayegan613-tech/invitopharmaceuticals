import PrivacyPolicyContent from "@/components/pages/PrivacyPolicyContent";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Privacy Policy",
    description: "Read how InVitvo Pharmaceuticals collects, uses, and protects website and RFQ information.",
    path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
    return <PrivacyPolicyContent />;
}
