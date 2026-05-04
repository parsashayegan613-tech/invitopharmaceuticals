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

const pageUrl = "https://www.invitvo.com/research/terrein-in-vitro-models";

export const metadata: Metadata = {
    title: `Terrein in Vitro Literature CAS ${terrein.cas}`,
    description: `Peer-reviewed in vitro and laboratory literature context for Terrein CAS ${terrein.cas}. RUO research compound.`,
    alternates: { canonical: pageUrl },
    openGraph: {
        title: `Terrein In Vitro Literature CAS ${terrein.cas}`,
        description: `Literature context for Terrein in cancer cell line, pigmentation pathway, and antimicrobial assay models.`,
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
        title: `Terrein In Vitro Literature CAS ${terrein.cas}`,
        description: `Peer-reviewed laboratory literature context for Terrein ${terrein.formula}.`,
        images: ["/og-image.png"],
    },
};

const references = [
    {
        title: "Terrein biosynthesis in Aspergillus terreus and its impact on phytotoxicity",
        citation: "Zaehle C, et al. Chemistry & Biology, 2014.",
        url: "https://doi.org/10.1016/j.chembiol.2014.03.010",
    },
    {
        title: "Isolation and characterization of terrein from Aspergillus terreus JAS-2",
        citation: "Goutam J, et al. Frontiers in Microbiology, 2017.",
        url: "https://doi.org/10.3389/fmicb.2017.01334",
    },
    {
        title: "Large-scale production of terrein by Aspergillus terreus strain S020",
        citation: "Ali I, et al. Biomolecules, 2019.",
        url: "https://doi.org/10.3390/biom9090480",
    },
];

export default function TerreinInVitroModelsPage() {
    const articleJsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Article",
                "@id": `${pageUrl}#article`,
                headline: `Terrein In Vitro Literature Context CAS ${terrein.cas}`,
                description: `Research literature context for Terrein ${terrein.formula} in laboratory assay models.`,
                mainEntityOfPage: pageUrl,
                datePublished: "2026-05-04",
                dateModified: "2026-05-04",
                author: { "@id": "https://www.invitvo.com/#organization" },
                publisher: { "@id": "https://www.invitvo.com/#organization" },
                about: { "@id": `${terrein.productUrl}#chemical` },
                citation: references.map((reference) => reference.url),
            },
            {
                "@type": "BreadcrumbList",
                "@id": `${pageUrl}#breadcrumb`,
                itemListElement: [
                    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.invitvo.com/" },
                    { "@type": "ListItem", position: 2, name: "Research", item: "https://www.invitvo.com/research/terrein-in-vitro-models" },
                    { "@type": "ListItem", position: 3, name: "Terrein In Vitro Literature", item: pageUrl },
                ],
            },
        ],
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Script
                id="terrein-in-vitro-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
            />
            <TopBar />
            <Header />
            <main id="main-content" tabIndex={-1} className="flex-grow">
                <PageHero title="Terrein In Vitro Literature" />
                <section className="py-6 bg-muted/30">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <RuoDisclaimer />
                    </div>
                </section>

                <section className="py-16 bg-background">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <div className="mb-10 rounded-lg border border-border bg-card p-6">
                            <p className="text-muted-foreground leading-relaxed">
                                Terrein ({terrein.displayFormula}; plain-text formula {terrein.formula}; CAS {terrein.cas}; InChIKey {terrein.inChIKey}) appears in peer-reviewed laboratory literature. The summaries below are provided only as literature context for qualified researchers. InVitvo does not claim therapeutic, diagnostic, clinical, human, or veterinary use.
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-3">
                            <section className="rounded-lg border border-border bg-card p-6">
                                <h2 className="text-xl font-medium text-foreground mb-3">Cancer Cell Line Assays</h2>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Published <em>in vitro</em> studies have used Terrein in specific cancer cell line assay systems with pathway and marker readouts. Those findings should be interpreted only within the original experimental design and are not InVitvo product claims.
                                </p>
                            </section>
                            <section className="rounded-lg border border-border bg-card p-6">
                                <h2 className="text-xl font-medium text-foreground mb-3">Pigmentation Pathway Models</h2>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Literature has investigated Terrein in melanogenesis-associated laboratory models. Researchers should consult the original paper methods for cell type, solvent, concentration range, timing, and controls.
                                </p>
                            </section>
                            <section className="rounded-lg border border-border bg-card p-6">
                                <h2 className="text-xl font-medium text-foreground mb-3">Antimicrobial Assay Models</h2>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Terrein has also been referenced in natural product assay literature involving microbial model systems. InVitvo supplies the compound for RUO laboratory research only, not for antimicrobial product development claims.
                                </p>
                            </section>
                        </div>

                        <section className="mt-12">
                            <h2 className="text-2xl font-light text-foreground mb-5">Selected References</h2>
                            <div className="space-y-4">
                                {references.map((reference) => (
                                    <div key={reference.url} className="rounded-lg border border-border bg-card p-5">
                                        <p className="font-medium text-foreground">{reference.title}</p>
                                        <p className="text-sm text-muted-foreground">{reference.citation}</p>
                                        <a
                                            href={reference.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-2 inline-flex min-h-11 items-center text-sm text-primary hover:underline"
                                        >
                                            View DOI
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
                            <Button asChild className="min-h-11 bg-accent hover:bg-accent/90 text-accent-foreground">
                                <Link href="/order?product=terrein&quantity=5mg">Request Terrein Quote</Link>
                            </Button>
                            <Button asChild variant="outline" className="min-h-11">
                                <Link href="/products/terrein">View Product Specifications</Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
