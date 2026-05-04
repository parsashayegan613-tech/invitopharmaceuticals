import AboutUsContent from "@/components/pages/AboutUsContent";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "About Us",
    description: "Edmonton supplier isolating and characterizing natural product research compounds from Canadian microorganisms.",
    path: "/about-us",
});

export default function AboutUsPage() {
    return <AboutUsContent />;
}
