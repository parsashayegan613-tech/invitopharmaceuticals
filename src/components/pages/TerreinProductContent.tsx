"use client";

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

const TerreinProductContent = () => {
    const specifications = [
        { label: "Chemical Name", value: "Terrein" },
        { label: "IUPAC Name", value: "(4S,5R)-4,5-dihydroxy-3-[(1E)-prop-1-en-1-yl]cyclopent-2-en-1-one" },
        { label: "Molecular Formula", value: "C₈H₁₀O₃" },
        { label: "Molecular Weight", value: "154.16 g/mol" },
        { label: "CAS Number", value: "16014-58-7" },
        { label: "Purity", value: ">95% (UHPLC)" },
        { label: "Source", value: "Aspergillus terreus (Canadian Endemic Strain)" },
        { label: "Physical Form", value: "Crystalline powder or lyophilized solid" },
        { label: "Solubility", value: "DMSO, Methanol, Ethanol" },
    ];

    const pricing = [
        { size: "5 mg", price: "C$450", sku: "INV-TER-005" },
        { size: "10 mg", price: "C$800", sku: "INV-TER-010" },
        { size: "Custom / Bulk", price: "Inquire for Quote", sku: "INV-TER-XXX" }
    ];

    const qcMethods = [
        { method: "UHPLC", description: "Chromatographic purity >95% determination using established calibration curves." },
        { method: "NMR Spectroscopy", description: "Direct ¹H and ¹³C NMR to confirm absolute structural integrity and stereochemistry." },
        { method: "Mass Spectrometry", description: "Tandem MS for molecular weight verification and fragmentation profiling." },
    ];

    const references = [
        {
            citation: "Zaehle C, et al. (2014) Terrein biosynthesis in Aspergillus terreus and its impact on phytotoxicity. Chemistry & Biology, 21(6), 719-731.",
            note: "Key insights into the multi-gene cluster responsible for terrein biosynthesis."
        },
        {
            citation: "Lee JC, et al. (2010) Terrein inhibits STAT3 activity and induces apoptosis in human cancer cells. Anticancer Research, 30(10), 3951-3955.",
            note: "Provides an in vitro baseline for terrein's anticancer potential."
        },
        {
            citation: "Arakawa M, et al. (2002) Antibacterial and antifungal activity of terrein. Biological & Pharmaceutical Bulletin, 25(5), 645-649.",
            note: "Fundamental antimicrobial activity assays spanning gram-positive and fungal strains."
        },
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <TopBar />
            <Header />
            <main className="flex-grow">
                <PageHero title="Terrein (>95% Purity)" />

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
                                    <h1 className="text-3xl font-light text-foreground mb-4">High Purity Terrein for Research</h1>
                                    <h2 className="text-xl text-primary mb-6">Bioactive Fungal Metabolite (CAS: 16014-58-7)</h2>
                                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                        Terrein is a highly bioactive secondary metabolite natively isolated from endemic Canadian soil strains of <em>Aspergillus terreus</em>. At InVitvo Pharmaceuticals, we utilize proprietary semi-industrial fungal fermentation to produce Terrein at analytical grades exceeding 95% purity.
                                    </p>
                                    <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                        As a potent inhibitor of biological pathways, Terrein has become a molecule of significant interest in preclinical oncology, dermatology (melanogenesis inhibition), and antimicrobial resistance research.
                                    </p>

                                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-block">
                                        <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-sm shadow-accent/20">
                                            <Link href="/order" className="flex items-center gap-2">
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
                                        alt="Terrein molecular structure"
                                        className="w-full max-w-xs mx-auto mb-4 object-contain"
                                        priority
                                    />
                                    <p className="text-sm text-muted-foreground">Terrein Molecular Structure (C₈H₁₀O₃)</p>

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
                                We supply standard analytical amounts and offer scalable bulk custom synthesis for extensive lead optimization campaigns.
                            </p>
                        </FadeInOnScroll>
                        <FadeInOnScroll delay={0.2}>
                            <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
                                <table className="w-full">
                                    <thead className="bg-muted">
                                        <tr>
                                            <th className="px-6 py-4 text-left font-medium text-foreground">SKU / Catalog</th>
                                            <th className="px-6 py-4 text-left font-medium text-foreground">Quantity</th>
                                            <th className="px-6 py-4 text-right font-medium text-foreground">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {pricing.map((item, index) => (
                                            <tr key={index} className="hover:bg-muted/30 transition-colors">
                                                <td className="px-6 py-4 text-muted-foreground font-mono">{item.sku}</td>
                                                <td className="px-6 py-4 font-medium text-foreground">{item.size}</td>
                                                <td className="px-6 py-4 text-right font-bold text-foreground">{item.price}</td>
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
                                <div className="bg-card border border-border rounded-lg overflow-hidden border-t-4 border-t-primary">
                                    <table className="w-full">
                                        <tbody className="divide-y divide-border">
                                            {specifications.map((spec, index) => (
                                                <tr key={index} className="hover:bg-muted/20">
                                                    <td className="px-4 py-3 font-medium text-foreground text-sm">{spec.label}</td>
                                                    <td className="px-4 py-3 text-muted-foreground text-right text-sm">{spec.value}</td>
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
                                <h2 className="section-title mb-0">Preclinical Applications & Literature</h2>
                            </div>
                            <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-10">
                                Terrein demonstrates pleiotropic biological activities that make it an exceptional compound for diverse laboratory investigations.
                            </p>
                        </FadeInOnScroll>

                        <div className="grid lg:grid-cols-3 gap-6 mb-12">
                            <FadeInOnScroll delay={0.1}>
                                <div className="bg-card p-6 rounded-lg border border-border h-full">
                                    <Activity className="w-8 h-8 text-primary mb-4" />
                                    <h4 className="text-lg font-semibold text-foreground mb-2">Preclinical Oncology</h4>
                                    <p className="text-sm text-muted-foreground">In vitro studies highlight Terrein's ability to inhibit STAT3 pathways and induce apoptotic responses in specific human cancer cell lines.</p>
                                </div>
                            </FadeInOnScroll>
                            <FadeInOnScroll delay={0.2}>
                                <div className="bg-card p-6 rounded-lg border border-border h-full">
                                    <Thermometer className="w-8 h-8 text-primary mb-4" />
                                    <h4 className="text-lg font-semibold text-foreground mb-2">Dermatology Models</h4>
                                    <p className="text-sm text-muted-foreground">Demonstrated as a powerful melanogenesis inhibitor by causing MITF protein degradation, making it valuable for pigmentation research.</p>
                                </div>
                            </FadeInOnScroll>
                            <FadeInOnScroll delay={0.3}>
                                <div className="bg-card p-6 rounded-lg border border-border h-full">
                                    <Shield className="w-8 h-8 text-primary mb-4" />
                                    <h4 className="text-lg font-semibold text-foreground mb-2">Antimicrobial Research</h4>
                                    <p className="text-sm text-muted-foreground">Serves as a reference compound for baseline antifungal and antibacterial assays when isolating novel soil metabolites.</p>
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
                                    </div>
                                ))}
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
                            </div>
                        </FadeInOnScroll>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-16 bg-primary/5">
                    <div className="container mx-auto px-4 max-w-2xl text-center">
                        <FadeInOnScroll>
                            <h2 className="text-2xl md:text-3xl font-light text-foreground mb-6">
                                Advance Your Assays with Premium Terrein
                            </h2>
                            <p className="text-lg text-muted-foreground mb-8">
                                Fast academic institutional processing available. Request a quote to check our current inventory block.
                            </p>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-block"
                            >
                                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/20">
                                    <Link href="/order" className="flex items-center gap-2">
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
