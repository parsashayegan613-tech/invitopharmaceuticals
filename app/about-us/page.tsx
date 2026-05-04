import type { Metadata } from "next";
import AboutUsContent from "@/components/pages/AboutUsContent";

export const metadata: Metadata = {
    title: "About Us",
    description:
        "Learn about InVitvo Pharmaceuticals, an Edmonton-based supplier isolating and characterizing natural product research compounds from Canadian microorganisms.",
    alternates: { canonical: "https://www.invitvo.com/about-us" },
};

export default function AboutUsPage() {
    return <AboutUsContent />;
}
