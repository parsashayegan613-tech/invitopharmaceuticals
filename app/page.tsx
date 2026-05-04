import type { Metadata } from "next";
import Script from "next/script";
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
import { faqs } from "@/lib/faqs";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
    title: "Research Compounds & Microbial Metabolites",
    description: "Canadian supplier of high-purity microbial research compounds. Terrein with COA/SDS documentation. RUO only.",
    path: "",
});

export default function HomePage() {
    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Script
                id="homepage-faq-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            <TopBar />
            <Header />
            <main id="main-content" tabIndex={-1} className="flex-grow">
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
