import type { Metadata } from "next";
import ThankYouContent from "@/components/pages/ThankYouContent";

export const metadata: Metadata = {
    title: "Thank You",
    description: "Thank you for contacting InVitvo Pharmaceuticals. We will be in touch shortly.",
    robots: { index: false, follow: false },
};

export default function ThankYouPage() {
    return <ThankYouContent />;
}
