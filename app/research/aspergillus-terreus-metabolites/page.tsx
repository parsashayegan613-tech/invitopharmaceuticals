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

const pageUrl = "https://www.invitvo.com/research/aspergillus-terreus-metabolites";

export const metadata: Metadata = {
    title: "Aspergillus terreus Metabolites | Terrein",
    description: `Research context for Aspergillus terreus secondary metabolites, Terrein CAS ${terrein.cas}, and natural-source analytical documentation.`,
    alternates: { canonical: pageUrl },
    openGraph: {
        title: "Aspergillus terreus Metabolites and Terrein",
        description: `Natural-source Terrein, biosynthesis literature, and analytical documentation context for RUO research.`,
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
        title: "Aspergillus terreus Metabolites and Terrein",
        description: `Research context for natural-source Terrein CAS ${terrein.cas}.`,
        images: ["/og-image.png"],
    },
};

export default function AspergillusTerreusMetabolitesPage() {
    const articleJsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Article",
                "@id": `${pageUrl}#article`,
                headline: "Aspergillus terreus Secondary Metabolites and Terrein",
                description: `Research context for Terrein ${terrein.formula} from Aspergillus terreus and natural product quality documentation.`,
                mainEntityOfPage: pageUrl,
                datePublished: "2026-05-04",
                dateModified: "2026-05-04",
                author: { "@id": "https://www.invitvo.com/#organization" },
                publisher: { "@id": "https://www.invitvo.com/#organization" },
                about: [
                    { "@id": `${terrein.productUrl}#chemical` },
                    { "@type": "Thing", name: "Aspergillus terreus secondary metabolites" },
                ],
            },
            {
                "@type": "BreadcrumbList",
                "@id": `${pageUrl}#breadcrumb`,
                itemListElement: [
                    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.invitvo.com/" },
                    { "@type": "ListItem", position: 2, name: "Research", item: "https://www.invitvo.com/research/aspergillus-terreus-metabolites" },
                    { "@type": "ListItem", position: 3, name: "Aspergillus terreus Metabolites", item: pageUrl },
                ],
            },
        ],
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Script
                id="aspergillus-terreus-metabolites-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
            />
            <TopBar />
            <Header />
            <main id="main-content" tabIndex={-1} className="flex-grow">
                <PageHero title="Aspergillus terreus Metabolites" />
                <section className="py-6 bg-muted/30">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <RuoDisclaimer />
                    </div>
                </section>

                <section className="py-16 bg-background">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <div className="mb-10 rounded-lg border border-border bg-card p-6">
                            <p className="text-muted-foreground leading-relaxed">
                                <em>Aspergillus terreus</em> is a fungal species reported in natural product literature as a source of secondary metabolites, including Terrein ({terrein.displayFormula}; plain-text formula {terrein.formula}; CAS {terrein.cas}). InVitvo&apos;s work focuses on isolation, purification, and analytical characterization for laboratory research use only.
                            </p>
                        </div>

                        <div className="space-y-12">
                            <section>
                                <h2 className="text-2xl font-light text-foreground mb-4">Natural-Source Terrein</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    InVitvo produces Terrein through fungal fermentation and downstream purification workflows. Natural-source material is paired with analytical documentation so researchers can review identity, purity, and batch traceability before use in laboratory protocols.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-light text-foreground mb-4">Natural Source vs Synthetic Alternatives</h2>
                                <div className="overflow-hidden rounded-lg border border-border bg-card">
                                    <table className="w-full table-fixed">
                                        <caption className="sr-only">Comparison of natural-source and synthetic Terrein sourcing considerations</caption>
                                        <thead className="bg-muted">
                                            <tr>
                                                <th scope="col" className="px-3 py-4 text-left text-sm font-medium text-foreground sm:px-6">Consideration</th>
                                                <th scope="col" className="px-3 py-4 text-left text-sm font-medium text-foreground sm:px-6">Natural-Source Terrein</th>
                                                <th scope="col" className="px-3 py-4 text-left text-sm font-medium text-foreground sm:px-6">Synthetic Alternative</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border">
                                            <tr>
                                                <th scope="row" className="px-3 py-4 text-left text-sm font-medium text-foreground sm:px-6">Source</th>
                                                <td className="px-3 py-4 text-sm text-muted-foreground sm:px-6">Produced from microbial fermentation and purified from the source organism workflow.</td>
                                                <td className="px-3 py-4 text-sm text-muted-foreground sm:px-6">Produced by chemical synthesis route selected by the supplier.</td>
                                            </tr>
                                            <tr>
                                                <th scope="row" className="px-3 py-4 text-left text-sm font-medium text-foreground sm:px-6">Documentation</th>
                                                <td className="px-3 py-4 text-sm text-muted-foreground sm:px-6">Batch COA and SDS supplied with every order.</td>
                                                <td className="px-3 py-4 text-sm text-muted-foreground sm:px-6">Documentation varies by vendor and batch.</td>
                                            </tr>
                                            <tr>
                                                <th scope="row" className="px-3 py-4 text-left text-sm font-medium text-foreground sm:px-6">Use Case</th>
                                                <td className="px-3 py-4 text-sm text-muted-foreground sm:px-6">Useful where researchers want a documented natural product source for RUO laboratory work.</td>
                                                <td className="px-3 py-4 text-sm text-muted-foreground sm:px-6">Useful where a synthetic route and supplier documentation match the research need.</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-light text-foreground mb-4">Quality Documentation</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    InVitvo uses UHPLC, NMR spectroscopy, and mass spectrometry workflows to support identity and purity review. Researchers should evaluate each batch using the supplied COA and SDS alongside their internal quality requirements.
                                </p>
                            </section>
                        </div>

                        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
                            <Button asChild className="min-h-11 bg-accent hover:bg-accent/90 text-accent-foreground">
                                <Link href="/order?product=terrein&quantity=5mg">Request Terrein Quote</Link>
                            </Button>
                            <Button asChild variant="outline" className="min-h-11">
                                <Link href="/research/terrein-in-vitro-models">View Literature Context</Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
