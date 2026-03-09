import type { Metadata } from "next";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Mission from "@/components/Mission";
import OurStory from "@/components/OurStory";
import WhyInVitvo from "@/components/WhyInVitvo";
import HowOrdering from "@/components/HowOrdering";
import Stats from "@/components/Stats";
import Research from "@/components/Research";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Research Compounds & Microbial Metabolites",
    description:
        "Canadian supplier of high-purity research compounds from microbial sources. Terrein and natural product metabolites with COA/SDS documentation. For research use only.",
    alternates: { canonical: "https://invitvo.com" },
};

export default function HomePage() {
    return (
        <div className="min-h-screen flex flex-col">
            <TopBar />
            <Header />
            <main className="flex-grow">
                <Hero />
                <Mission />
                <OurStory />
                <HowOrdering />
                <Stats />
                <WhyInVitvo />
                <Research />
                <FAQ />
            </main>
            <Footer />
        </div>
    );
}
