"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";
import RuoDisclaimer from "@/components/RuoDisclaimer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Beaker, Activity, Award, Download, Thermometer, Truck, BookOpen, FlaskConical, CheckCircle2 } from "lucide-react";
import terreinMolecule from "@/assets/terrein-molecule.png";
import { trackEvent } from "@/lib/analytics";
import { terrein } from "@/lib/terrein";
import { productList } from "@/lib/products";

const TerreinProductContent = () => {
    useEffect(() => {
        trackEvent("product_page_view", {
            compound: terrein.name,
            cas: terrein.cas,
            product_id: "INV-TER",
            quantity: productList.map((product) => product.amount).join(", "),
        });
    }, []);

    const specifications = [
        { label: "Chemical Name", value: terrein.name },
        { label: "Synonyms", value: terrein.synonyms.join(", ") },
        { label: "IUPAC Name", value: terrein.iupacName },
        { label: "Molecular Formula", value: `${terrein.displayFormula} (${terrein.formula})` },
        { label: "Molecular Weight", value: terrein.molecularWeight },
        { label: "CAS Number", value: terrein.cas },
        { label: "InChIKey", value: terrein.inChIKey },
        { label: "SMILES", value: terrein.smiles },
        { label: "Purity", value: ">95% (UHPLC)" },
        { label: "Source", value: <><em>Aspergillus terreus</em> (Canadian soil isolate)</> },
        { label: "Physical Form", value: "Crystalline powder or lyophilized solid" },
        { label: "Solubility", value: "DMSO, Methanol, Ethanol" },
    ];

    const qcMethods = [
        { method: "UHPLC", description: "Chromatographic purity >95% determination using established calibration curves." },
        { method: "NMR Spectroscopy", description: "Direct ¹H and ¹³C NMR to confirm absolute structural integrity and stereochemistry." },
        { method: "Mass Spectrometry", description: "Tandem MS for molecular weight verification and fragmentation profiling." },
    ];

    const references = [
        {
            citation: "Zaehle C, et al. (2014) Terrein biosynthesis in Aspergillus terreus and its impact on phytotoxicity. Chemistry & Biology, 21(6), 719-731.",
            note: "Key insights into the multi-gene cluster responsible for terrein biosynthesis.",
            url: "https://doi.org/10.1016/j.chembiol.2014.03.010",
        },
        {
            citation: "Goutam J, et al. (2017) Isolation and characterization of terrein from Aspergillus terreus JAS-2. Frontiers in Microbiology, 8, 1334.",
            note: "Reports isolation, characterization, and laboratory bioassay context for terrein.",
            url: "https://doi.org/10.3389/fmicb.2017.01334",
        },
        {
            citation: "Ali I, et al. (2019) Large-scale production of terrein by Aspergillus terreus strain S020. Biomolecules, 9(9), 480.",
            note: "Describes production and analytical characterization context for terrein.",
            url: "https://doi.org/10.3390/biom9090480",
        },
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <TopBar />
            <Header />
            <main id="main-content" tabIndex={-1} className="flex-grow">
                <PageHero title={`Terrein CAS ${terrein.cas}`} />

                {/* RUO Disclaimer */}
                <section className="py-6 bg-muted/30">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <RuoDisclaimer />
                    </div>
                </section>

                {/* Primary Overview */}
                <section className="py-16 bg-background">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <FadeInOnScroll direction="left">
                                <div>
                                    <h2 className="text-3xl font-light text-foreground mb-4">High Purity Terrein for Research</h2>
                                    <p className="text-xl text-primary mb-6">Fungal Secondary Metabolite ({terrein.displayFormula}; CAS: {terrein.cas})</p>
                                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                        Terrein is a secondary metabolite isolated from Canadian soil strains of <em>Aspergillus terreus</em>. At InVitvo Pharmaceuticals, we use fungal fermentation and analytical purification workflows to produce Terrein at grades exceeding 95% UHPLC purity.
                                    </p>
                                    <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                        Terrein has been investigated in peer-reviewed <em>in vitro</em> literature, including cancer cell line, pigmentation pathway, and antimicrobial assay models. InVitvo supplies Terrein only as an RUO research compound and makes no therapeutic, diagnostic, clinical, human, or veterinary-use claims.
                                    </p>

                                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-block">
                                        <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-sm shadow-accent/20">
                                            <Link href="/order?product=terrein&quantity=5mg" className="flex items-center gap-2">
                                                Request Quote
                                                <ArrowRight className="w-4 h-4" />
                                            </Link>
                                        </Button>
                                    </motion.div>
                                </div>
                            </FadeInOnScroll>
                            <FadeInOnScroll direction="right" delay={0.2}>
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="bg-card border border-border rounded-lg p-8 text-center"
                                >
                                    <Image
                                        src={terreinMolecule}
                                        alt={`Terrein molecular structure ${terrein.formula} CAS ${terrein.cas}`}
                                        className="w-full max-w-xs mx-auto mb-4 object-contain"
                                        priority
                                    />
                                    <p className="text-sm text-muted-foreground">Terrein Molecular Structure ({terrein.displayFormula})</p>

                                </motion.div>
                            </FadeInOnScroll>
                        </div>
                    </div>
                </section>

                {/* Pricing & Availability Table */}
                <section className="py-16 bg-section-alt">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <FadeInOnScroll>
                            <h2 className="section-title mb-8">Available Quantities & Pricing</h2>
                            <p className="text-center text-muted-foreground mb-8 text-lg">
                                We supply standard analytical quantities and quote custom purification amounts for larger laboratory research programs.
                            </p>
                        </FadeInOnScroll>
                        <FadeInOnScroll delay={0.2}>
                            <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
                                <table className="w-full table-fixed">
                                    <caption className="sr-only">Terrein pricing by quantity</caption>
                                    <thead className="bg-muted">
                                        <tr>
                                            <th scope="col" className="px-3 py-4 text-left text-sm font-medium text-foreground sm:px-6 sm:text-base">SKU / Catalog</th>
                                            <th scope="col" className="px-3 py-4 text-left text-sm font-medium text-foreground sm:px-6 sm:text-base">Quantity</th>
                                            <th scope="col" className="px-3 py-4 text-right text-sm font-medium text-foreground sm:px-6 sm:text-base">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {productList.map((item) => (
                                            <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                                                <td className="break-words px-3 py-4 text-sm text-muted-foreground font-mono sm:px-6">{item.catalog}</td>
                                                <td className="px-3 py-4 text-sm font-medium text-foreground sm:px-6">{item.isCustomQuantity ? "Custom / Bulk" : item.amount}</td>
                                                <td className="px-3 py-4 text-right text-sm font-bold text-foreground sm:px-6">{item.isCustomQuantity ? "Inquire for Quote" : item.price}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </FadeInOnScroll>
                    </div>
                </section>

                {/* Analytical Data & Specifications */}
                <section className="py-16 bg-background">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <div className="grid md:grid-cols-2 gap-12">
                            <FadeInOnScroll>
                                <h3 className="text-2xl font-light text-foreground mb-6">Technical Specifications</h3>
                                <div className="overflow-hidden rounded-lg border border-border border-t-4 border-t-primary bg-card">
                                    <table className="w-full table-fixed">
                                        <caption className="sr-only">Terrein technical specifications</caption>
                                        <tbody className="divide-y divide-border">
                                            {specifications.map((spec, index) => (
                                                <tr key={index} className="hover:bg-muted/20">
                                                    <th scope="row" className="px-3 py-3 text-left font-medium text-foreground text-sm sm:px-4">{spec.label}</th>
                                                    <td className="px-3 py-3 text-muted-foreground text-right text-sm break-all sm:px-4">{spec.value}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </FadeInOnScroll>

                            <FadeInOnScroll delay={0.2}>
                                <h3 className="text-2xl font-light text-foreground mb-6">Quality Control Methods</h3>
                                <div className="space-y-4">
                                    {qcMethods.map((qc, idx) => (
                                        <div key={idx} className="bg-card border border-border rounded-lg p-5">
                                            <div className="flex items-center gap-3 mb-2">
                                                <CheckCircle2 className="w-5 h-5 text-primary" />
                                                <h4 className="font-semibold text-foreground">{qc.method}</h4>
                                            </div>
                                            <p className="text-sm text-muted-foreground pl-8">{qc.description}</p>
                                        </div>
                                    ))}

                                    <div className="bg-primary/5 rounded-lg p-5 mt-6 border border-primary/20">
                                        <div className="flex items-start gap-4">
                                            <div className="shrink-0 p-2 bg-primary/10 rounded-full">
                                                <Award className="w-6 h-6 text-primary" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-foreground mb-1">Documentation Included</h4>
                                                <p className="text-sm text-muted-foreground mb-3">Every order ships with a batch-specific COA and SDS to ensure compliance and traceability across your assays.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </FadeInOnScroll>
                        </div>
                    </div>
                </section>

                {/* Applications & Literature */}
                <section className="py-16 bg-section-alt">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <FadeInOnScroll>
                            <div className="flex items-center justify-center gap-3 mb-10">
                                <FlaskConical className="w-8 h-8 text-primary" />
                                <h2 className="section-title mb-0">Research Applications & Literature</h2>
                            </div>
                            <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-10">
                                Published studies have investigated Terrein in multiple laboratory model systems. These references are provided for research context only.
                            </p>
                        </FadeInOnScroll>

                        <div className="grid lg:grid-cols-3 gap-6 mb-12">
                            <FadeInOnScroll delay={0.1}>
                                <div className="bg-card p-6 rounded-lg border border-border h-full">
                                    <Activity className="w-8 h-8 text-primary mb-4" />
                                    <h4 className="text-lg font-semibold text-foreground mb-2">Cancer Cell Line Research</h4>
                                    <p className="text-sm text-muted-foreground">Cited <em>in vitro</em> studies report Terrein effects in specific human cancer cell line assays, including STAT3 pathway and apoptosis-marker readouts.</p>
                                </div>
                            </FadeInOnScroll>
                            <FadeInOnScroll delay={0.2}>
                                <div className="bg-card p-6 rounded-lg border border-border h-full">
                                    <Thermometer className="w-8 h-8 text-primary mb-4" />
                                    <h4 className="text-lg font-semibold text-foreground mb-2">Pigmentation Pathway Models</h4>
                                    <p className="text-sm text-muted-foreground">Reported in literature for melanogenesis-associated pathway studies in laboratory model systems.</p>
                                </div>
                            </FadeInOnScroll>
                            <FadeInOnScroll delay={0.3}>
                                <div className="bg-card p-6 rounded-lg border border-border h-full">
                                    <Shield className="w-8 h-8 text-primary mb-4" />
                                    <h4 className="text-lg font-semibold text-foreground mb-2">Antimicrobial Assay Research</h4>
                                    <p className="text-sm text-muted-foreground">Used as a literature-referenced compound in antifungal and antibacterial assay design for natural product research.</p>
                                </div>
                            </FadeInOnScroll>
                        </div>

                        <FadeInOnScroll delay={0.4}>
                            <h3 className="text-xl font-medium text-foreground mb-4 border-b border-border pb-2">Selected Peer-Reviewed References</h3>
                            <div className="space-y-4">
                                {references.map((ref, index) => (
                                    <div key={index} className="bg-background rounded p-4 text-sm border-l-2 border-primary">
                                        <p className="text-muted-foreground mb-1 font-medium">{ref.citation}</p>
                                        <p className="text-primary/80 italic">{ref.note}</p>
                                        <a
                                            href={ref.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-2 inline-flex min-h-11 items-center text-primary hover:underline"
                                        >
                                            View DOI
                                        </a>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <Button asChild variant="outline" className="min-h-11">
                                    <Link href="/research/terrein-in-vitro-models">
                                        View Terrein Literature Context
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" className="min-h-11">
                                    <Link href="/research/aspergillus-terreus-metabolites">
                                        View Source & Metabolite Context
                                    </Link>
                                </Button>
                            </div>
                        </FadeInOnScroll>
                    </div>
                </section>

                {/* Storage & Handling */}
                <section className="py-16 bg-background">
                    <div className="container mx-auto px-4 max-w-3xl">
                        <FadeInOnScroll>
                            <h2 className="section-title mb-8">Storage & Handling</h2>
                        </FadeInOnScroll>
                        <FadeInOnScroll delay={0.2}>
                            <div className="bg-card border border-border rounded-lg p-8">
                                <ul className="text-base text-muted-foreground space-y-3">
                                    <li className="flex gap-3"><span className="text-primary font-bold">•</span> <strong>Storage Conditions:</strong> Ship at ambient temperature. Store at -20°C for long-term stability up to 24 months.</li>
                                    <li className="flex gap-3"><span className="text-primary font-bold">•</span> <strong>Protection:</strong> Store in tightly sealed vials away from direct light and moisture.</li>
                                    <li className="flex gap-3"><span className="text-primary font-bold">•</span> <strong>Handling:</strong> Handle exclusively within a certified fume hood or ventilated environment using standard PPE (nitrile gloves, lab coat, safety glasses).</li>
                                    <li className="flex gap-3"><span className="text-primary font-bold">•</span> <strong>Preparation:</strong> Soluble in DMSO (recommended to make stock solutions immediately before use).</li>
                                </ul>
                                <Button asChild variant="outline" className="mt-6 min-h-11">
                                    <Link href="/resources/terrein-handling">
                                        View Terrein Handling Guide
                                    </Link>
                                </Button>
                            </div>
                        </FadeInOnScroll>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-16 bg-primary/5">
                    <div className="container mx-auto px-4 max-w-2xl text-center">
                        <FadeInOnScroll>
                            <h2 className="text-2xl md:text-3xl font-light text-foreground mb-6">
                                Request Terrein for Laboratory Research
                            </h2>
                            <p className="text-lg text-muted-foreground mb-8">
                                Request a quote to confirm current inventory, documentation, and lead time for your research-use quantity.
                            </p>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-block"
                            >
                                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/20">
                                    <Link href="/order?product=terrein&quantity=5mg" className="flex items-center gap-2">
                                        Request RFQ Now
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </Button>
                            </motion.div>
                        </FadeInOnScroll>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default TerreinProductContent;
