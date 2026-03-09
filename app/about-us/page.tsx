import type { Metadata } from "next";
import AboutUsContent from "@/components/pages/AboutUsContent";

export const metadata: Metadata = {
    title: "About Us",
    description:
        "Learn about InVitvo Pharmaceuticals — a research-based scientific company founded in Edmonton, Alberta, dedicated to isolating and characterizing pharmacologically active secondary metabolites from natural resources.",
    alternates: { canonical: "https://invitvo.com/about-us" },
};

export default function AboutUsPage() {
    return <AboutUsContent />;
}
