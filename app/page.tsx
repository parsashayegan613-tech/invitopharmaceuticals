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
import TerreinPurchase from "@/components/TerreinPurchase";
import Link from "next/link";

export const metadata: Metadata = pageMetadata({
    title: "Terrein Supplier in Canada | Research Compounds",
    description: "Request Terrein CAS 582-46-7 from InVitvo in Canada. >95% UHPLC purity, 5 mg and 10 mg quantities, COA/SDS documentation. For laboratory research only.",
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
                <TerreinPurchase location="homepage_quantities" />
                <Mission />
                <OurStory />
                <HowOrdering />
                <Stats />
                <WhyInVitvo />
                <Research />
                <section className="border-y border-border py-12">
                    <div className="container mx-auto max-w-5xl px-4">
                        <h2 className="text-2xl font-semibold">Investors & research partners</h2>
                        <p className="mt-3 max-w-2xl text-muted-foreground">Learn about InVitvo&apos;s research compound business, microbial metabolite work, and scientific team.</p>
                        <Link href="/investors" className="mt-5 inline-flex min-h-11 items-center text-primary underline underline-offset-4">Explore InVitvo for investors</Link>
                    </div>
                </section>
                <FAQ />
            </main>
            <Footer />
        </div>
    );
}
