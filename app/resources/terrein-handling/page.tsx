import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import RuoDisclaimer from "@/components/RuoDisclaimer";
import { Button } from "@/components/ui/button";
import { terrein } from "@/lib/terrein";

const pageUrl = "https://www.invitvo.com/resources/terrein-handling";

export const metadata: Metadata = {
    title: `Terrein Handling Guide CAS ${terrein.cas} | RUO`,
    description: `Handling, storage, DMSO preparation, and documentation notes for Terrein CAS ${terrein.cas}. Research use only.`,
    alternates: { canonical: pageUrl },
    openGraph: {
        title: `Terrein Handling Guide CAS ${terrein.cas}`,
        description: `Storage, solution preparation, and documentation notes for Terrein ${terrein.formula}. Research use only.`,
        url: pageUrl,
        type: "article",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: `Terrein molecular structure ${terrein.formula} CAS ${terrein.cas}`,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: `Terrein Handling Guide CAS ${terrein.cas}`,
        description: `Storage and preparation notes for Terrein ${terrein.formula}. Research use only.`,
        images: ["/og-image.png"],
    },
};

export default function TerreinHandlingPage() {
    const articleJsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "TechArticle",
                "@id": `${pageUrl}#article`,
                headline: `Terrein Handling Guide CAS ${terrein.cas}`,
                description: `Research-use handling, storage, and solution preparation notes for Terrein ${terrein.formula}.`,
                mainEntityOfPage: pageUrl,
                datePublished: "2026-05-04",
                dateModified: "2026-05-04",
                author: { "@id": "https://www.invitvo.com/#organization" },
                publisher: { "@id": "https://www.invitvo.com/#organization" },
                about: { "@id": `${terrein.productUrl}#chemical` },
            },
            {
                "@type": "BreadcrumbList",
                "@id": `${pageUrl}#breadcrumb`,
                itemListElement: [
                    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.invitvo.com/" },
                    { "@type": "ListItem", position: 2, name: "Resources", item: "https://www.invitvo.com/resources/terrein-handling" },
                    { "@type": "ListItem", position: 3, name: "Terrein Handling Guide", item: pageUrl },
                ],
            },
        ],
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Script
                id="terrein-handling-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
            />
            <TopBar />
            <Header />
            <main id="main-content" tabIndex={-1} className="flex-grow">
                <PageHero title="Terrein Handling Guide" />
                <section className="py-6 bg-muted/30">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <RuoDisclaimer />
                    </div>
                </section>

                <section className="py-16 bg-background">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <div className="mb-10 rounded-lg border border-border bg-card p-6">
                            <p className="text-sm text-muted-foreground">
                                This guide summarizes general laboratory handling considerations for Terrein ({terrein.displayFormula}; plain-text formula {terrein.formula}; CAS {terrein.cas}). Always follow the batch-specific Safety Data Sheet, Certificate of Analysis, and your institution&apos;s safety procedures.
                            </p>
                        </div>

                        <div className="space-y-12">
                            <section>
                                <h2 className="text-2xl font-light text-foreground mb-4">Before Opening the Vial</h2>
                                <ul className="list-disc pl-6 text-muted-foreground space-y-3">
                                    <li>Confirm the catalog number, amount, batch number, CAS number, and COA match the received material.</li>
                                    <li>Review the SDS before transferring or weighing the compound.</li>
                                    <li>Use a certified fume hood or equivalent ventilated environment with gloves, eye protection, and a lab coat.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-light text-foreground mb-4">Storage</h2>
                                <ul className="list-disc pl-6 text-muted-foreground space-y-3">
                                    <li>Store unopened and resealed vials at -20°C for long-term storage unless the batch-specific SDS states otherwise.</li>
                                    <li>Protect from light and moisture. Keep containers tightly sealed when not in use.</li>
                                    <li>Avoid repeated warm-cold cycles by preparing small aliquots when repeated use is expected.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-light text-foreground mb-4">Solution Preparation</h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    Terrein is commonly prepared in DMSO, methanol, or ethanol for laboratory assay workflows. Solvent choice, stock concentration, and final vehicle concentration should be selected by the research laboratory based on the intended <em>in vitro</em> or analytical method.
                                </p>
                                <ul className="list-disc pl-6 text-muted-foreground space-y-3">
                                    <li>Warm the sealed vial to room temperature before opening to limit condensation.</li>
                                    <li>Record solvent, stock concentration, date prepared, operator, and storage conditions.</li>
                                    <li>Filter or centrifuge only when required by the laboratory method and compatible with the compound and solvent system.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-light text-foreground mb-4">Documentation</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    Every InVitvo Terrein order includes a batch-specific COA and SDS. Keep those documents with your laboratory records for traceability, institutional procurement review, and internal RUO compliance records.
                                </p>
                            </section>
                        </div>

                        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
                            <Button asChild className="min-h-11 bg-accent hover:bg-accent/90 text-accent-foreground">
                                <Link href="/order?product=terrein&quantity=5mg">Request Terrein Quote</Link>
                            </Button>
                            <Button asChild variant="outline" className="min-h-11">
                                <Link href="/products/terrein">View Terrein Specifications</Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
