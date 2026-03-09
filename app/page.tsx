import type { Metadata } from "next";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Mission from "@/components/Mission";
import HowOrdering from "@/components/HowOrdering";
import Stats from "@/components/Stats";
import Research from "@/components/Research";
import LatestUpdates from "@/components/LatestUpdates";
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
                <HowOrdering />
                <Stats />
                <Research />
                <LatestUpdates />
            </main>
            <Footer />
        </div>
    );
}
