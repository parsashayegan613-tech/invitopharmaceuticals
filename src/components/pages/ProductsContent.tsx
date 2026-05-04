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
import { ArrowRight, Shield, Beaker, Activity, Award, Download, Thermometer, Truck, BookOpen, FlaskConical } from "lucide-react";
import terreinMolecule from "@/assets/terrein-molecule.png";
import { terrein } from "@/lib/terrein";

const ProductsContent = () => {
    const features = [
        {
            icon: Shield,
            title: "Purity >95%",
            description: "Verified by UHPLC analysis with calibration standards"
        },
        {
            icon: Activity,
            title: "Literature Context",
            description: <>Published <em>in vitro</em> and laboratory research references</>
        },
        {
            icon: Beaker,
            title: "Research Grade",
            description: "Suitable for qualified laboratory research use"
        },
        {
            icon: Award,
            title: "Full Documentation",
            description: "COA and SDS provided with every order"
        },
    ];

    const specifications = [
        { label: "Chemical Name", value: terrein.name },
        { label: "Molecular Formula", value: `${terrein.displayFormula} (${terrein.formula})` },
        { label: "Molecular Weight", value: terrein.molecularWeight },
        { label: "CAS Number", value: terrein.cas },
        { label: "InChIKey", value: terrein.inChIKey },
        { label: "Purity", value: ">95% (UHPLC)" },
        { label: "Source", value: <em>Aspergillus terreus</em> },
        { label: "Origin", value: "Canadian soil isolates" },
        { label: "Physical Form", value: "Crystalline powder" },
        { label: "Solubility", value: "DMSO, Methanol, Ethanol" },
    ];

    const qcMethods = [
        { method: "UHPLC", description: "Purity determination with calibration curve" },
        { method: "NMR Spectroscopy", description: "Structure confirmation (¹H and ¹³C)" },
        { method: "Mass Spectrometry", description: "Tandem MS for molecular weight verification" },
        { method: "Optical Rotation", description: "Stereochemistry confirmation" },
    ];

    const references = [
        {
            citation: "Zaehle C, et al. (2014) Terrein biosynthesis in Aspergillus terreus and its impact on phytotoxicity. Chemistry & Biology, 21(6), 719-731.",
            note: "Biosynthesis pathway characterization",
            url: "https://doi.org/10.1016/j.chembiol.2014.03.010",
        },
        {
            citation: "Goutam J, et al. (2017) Isolation and characterization of terrein from Aspergillus terreus JAS-2. Frontiers in Microbiology, 8, 1334.",
            note: "Isolation, characterization, and laboratory bioassay context",
            url: "https://doi.org/10.3389/fmicb.2017.01334",
        },
        {
            citation: "Ali I, et al. (2019) Large-scale production of terrein by Aspergillus terreus strain S020. Biomolecules, 9(9), 480.",
            note: "Production and analytical characterization context",
            url: "https://doi.org/10.3390/biom9090480",
        },
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <TopBar />
            <Header />
            <main id="main-content" tabIndex={-1} className="flex-grow">
                <PageHero title="Products" />

                {/* RUO Disclaimer */}
                <section className="py-6 bg-muted/30">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <RuoDisclaimer />
                    </div>
                </section>

                {/* Product Overview */}
                <section className="py-16 bg-background">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <FadeInOnScroll direction="left">
                                <div>
                                    <h2 className="text-3xl font-light text-foreground mb-6">Terrein</h2>
                                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                        Terrein is a secondary metabolite isolated from <em>Aspergillus terreus</em> strains obtained from Canadian soil samples. Our high-purity Terrein (&gt;95%) is produced at semi-industrial scale using proprietary fermentation media developed by InVitvo Pharmaceuticals scientists.
                                    </p>
                                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                        This compound has been extensively characterized using advanced analytical techniques including UHPLC, tandem mass spectrometry, and NMR spectroscopy. Terrein is available for academic and industrial research applications.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 mt-6">
                                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-block">
                                            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground w-full whitespace-normal text-center sm:w-auto">
                                                <Link href="/products/terrein" className="flex items-center justify-center gap-2">
                                                    View Terrein CAS {terrein.cas} Specifications
                                                    <ArrowRight className="w-4 h-4" />
                                                </Link>
                                            </Button>
                                        </motion.div>
                                    </div>
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
                                    />
                                    <p className="text-sm text-muted-foreground">Terrein Molecular Structure ({terrein.displayFormula})</p>
                                </motion.div>
                            </FadeInOnScroll>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section className="py-16 bg-section-alt">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <FadeInOnScroll>
                            <h2 className="section-title mb-12">Product Features</h2>
                        </FadeInOnScroll>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {features.map((feature, index) => (
                                <FadeInOnScroll key={index} delay={index * 0.1} className="h-full">
                                    <motion.div
                                        whileHover={{ y: -5 }}
                                        className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300 h-full flex flex-col items-center"
                                    >
                                        <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-full mb-4">
                                            <feature.icon className="w-7 h-7 text-primary" />
                                        </div>
                                        <h4 className="text-lg font-medium text-foreground mb-2">{feature.title}</h4>
                                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                                    </motion.div>
                                </FadeInOnScroll>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Research Applications */}
                <section className="py-16 bg-background">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <FadeInOnScroll>
                            <div className="flex items-center justify-center gap-3 mb-8">
                                <FlaskConical className="w-8 h-8 text-primary" />
                                <h2 className="section-title mb-0">Research Applications</h2>
                            </div>
                        </FadeInOnScroll>
                        <FadeInOnScroll delay={0.2}>
                            <div className="max-w-3xl mx-auto">
                                <p className="text-lg text-muted-foreground leading-relaxed mb-6 text-center">
                                    Terrein has been investigated in peer-reviewed literature for laboratory research applications:
                                </p>
                                <ul className="space-y-3 mb-6">
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-primary rounded-full mt-2.5 shrink-0" />
                                        <span className="text-muted-foreground">Cited <em>in vitro</em> cancer cell line studies</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-primary rounded-full mt-2.5 shrink-0" />
                                        <span className="text-muted-foreground">Antimicrobial assay investigations</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-primary rounded-full mt-2.5 shrink-0" />
                                        <span className="text-muted-foreground">Natural product biosynthesis pathway studies</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-primary rounded-full mt-2.5 shrink-0" />
                                        <span className="text-muted-foreground">Chemical modification and derivative characterization research</span>
                                    </li>
                                </ul>
                                <div className="bg-muted/50 border border-border rounded-lg p-4">
                                    <p className="text-sm text-muted-foreground italic">
                                        <strong>Disclaimer:</strong> Reported biological activities are based on published laboratory studies. This product is for research use only and is not intended for human, veterinary, diagnostic, clinical, or therapeutic use.
                                    </p>
                                </div>
                            </div>
                        </FadeInOnScroll>
                    </div>
                </section>

                {/* Technical Specifications */}
                <section className="py-16 bg-section-alt">
                    <div className="container mx-auto px-4 max-w-3xl">
                        <FadeInOnScroll>
                            <h2 className="section-title mb-12">Technical Specifications</h2>
                        </FadeInOnScroll>
                        <FadeInOnScroll delay={0.2}>
                            <div className="overflow-hidden rounded-lg border border-border bg-card">
                                <table className="w-full table-fixed">
                                    <caption className="sr-only">Terrein technical specifications</caption>
                                    <tbody className="divide-y divide-border">
                                        {specifications.map((spec, index) => (
                                            <tr key={index} className="hover:bg-muted/50 transition-colors">
                                                <th scope="row" className="px-3 py-4 text-left text-sm font-medium text-foreground sm:px-6 sm:text-base">{spec.label}</th>
                                                <td className="break-all px-3 py-4 text-right text-sm text-muted-foreground sm:px-6 sm:text-base">{spec.value}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </FadeInOnScroll>
                    </div>
                </section>

                {/* Quality Control */}
                <section className="py-16 bg-background">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <FadeInOnScroll>
                            <h2 className="section-title mb-12">Quality Control</h2>
                        </FadeInOnScroll>
                        <div className="grid md:grid-cols-2 gap-6">
                            {qcMethods.map((item, index) => (
                                <FadeInOnScroll key={index} delay={index * 0.1}>
                                    <motion.div
                                        whileHover={{ y: -3 }}
                                        className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all duration-300"
                                    >
                                        <h4 className="text-lg font-medium text-foreground mb-2">{item.method}</h4>
                                        <p className="text-sm text-muted-foreground">{item.description}</p>
                                    </motion.div>
                                </FadeInOnScroll>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Documentation */}
                <section className="py-16 bg-section-alt">
                    <div className="container mx-auto px-4 max-w-3xl">
                        <FadeInOnScroll>
                            <h2 className="section-title mb-4">Documentation</h2>
                            <p className="text-center text-muted-foreground mb-12">
                                Complete documentation provided with every order
                            </p>
                        </FadeInOnScroll>
                        <FadeInOnScroll delay={0.2}>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <motion.div
                                    whileHover={{ y: -3 }}
                                    className="bg-card border border-border rounded-lg p-6 text-center"
                                >
                                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                                        <Download className="w-6 h-6 text-primary" />
                                    </div>
                                    <h4 className="text-lg font-medium text-foreground mb-2">Certificate of Analysis (COA)</h4>
                                    <p className="text-sm text-muted-foreground mb-4">Batch-specific purity data, analytical results, and QC confirmation</p>
                                    <Button variant="outline" disabled className="w-full">
                                        Available with Order
                                    </Button>
                                </motion.div>

                                <motion.div
                                    whileHover={{ y: -3 }}
                                    className="bg-card border border-border rounded-lg p-6 text-center"
                                >
                                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                                        <Download className="w-6 h-6 text-primary" />
                                    </div>
                                    <h4 className="text-lg font-medium text-foreground mb-2">Safety Data Sheet (SDS)</h4>
                                    <p className="text-sm text-muted-foreground mb-4">Hazard information, handling precautions, and storage requirements</p>
                                    <Button variant="outline" disabled className="w-full">
                                        Available with Order
                                    </Button>
                                </motion.div>
                            </div>
                        </FadeInOnScroll>
                    </div>
                </section>

                {/* Storage & Handling */}
                <section className="py-16 bg-background">
                    <div className="container mx-auto px-4 max-w-3xl">
                        <FadeInOnScroll>
                            <div className="flex items-center justify-center gap-3 mb-12">
                                <Thermometer className="w-8 h-8 text-primary" />
                                <h2 className="section-title mb-0">Storage & Handling</h2>
                            </div>
                        </FadeInOnScroll>
                        <FadeInOnScroll delay={0.2}>
                            <div className="bg-card border border-border rounded-lg p-8">
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-medium text-foreground mb-2">Storage Conditions</h4>
                                        <ul className="text-sm text-muted-foreground space-y-2">
                                            <li>• Store at -20°C for long-term storage</li>
                                            <li>• Protect from light and moisture</li>
                                            <li>• Keep container tightly sealed</li>
                                            <li>• Stable for 2+ years under recommended conditions</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-foreground mb-2">Handling Precautions</h4>
                                        <ul className="text-sm text-muted-foreground space-y-2">
                                            <li>• Handle in a well-ventilated area</li>
                                            <li>• Wear appropriate PPE (gloves, lab coat, eye protection)</li>
                                            <li>• Avoid inhalation and skin contact</li>
                                            <li>• Refer to SDS for complete safety information</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </FadeInOnScroll>
                    </div>
                </section>

                {/* Shipping & Lead Times */}
                <section className="py-16 bg-section-alt">
                    <div className="container mx-auto px-4 max-w-3xl">
                        <FadeInOnScroll>
                            <div className="flex items-center justify-center gap-3 mb-12">
                                <Truck className="w-8 h-8 text-primary" />
                                <h2 className="section-title mb-0">Shipping & Lead Times</h2>
                            </div>
                        </FadeInOnScroll>
                        <FadeInOnScroll delay={0.2}>
                            <div className="bg-card border border-border rounded-lg p-8">
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-medium text-foreground mb-2">Domestic (Canada)</h4>
                                        <ul className="text-sm text-muted-foreground space-y-2">
                                            <li>• Lead time: 5-7 business days</li>
                                            <li>• Shipped under conditions specified in the quotation and SDS</li>
                                            <li>• Tracking provided</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-foreground mb-2">International</h4>
                                        <ul className="text-sm text-muted-foreground space-y-2">
                                            <li>• Lead time: 7-14 business days</li>
                                            <li>• Customs documentation provided</li>
                                            <li>• Import duties payable by recipient</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="mt-6 pt-6 border-t border-border">
                                    <p className="text-sm text-muted-foreground">
                                        <strong>Note:</strong> Custom quantities or bulk orders may require additional lead time. Contact us for availability and scheduling.
                                    </p>
                                </div>
                            </div>
                        </FadeInOnScroll>
                    </div>
                </section>

                {/* References */}
                <section className="py-16 bg-background">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <FadeInOnScroll>
                            <div className="flex items-center justify-center gap-3 mb-12">
                                <BookOpen className="w-8 h-8 text-primary" />
                                <h2 className="section-title mb-0">Selected References</h2>
                            </div>
                        </FadeInOnScroll>
                        <FadeInOnScroll delay={0.2}>
                            <div className="space-y-4">
                                {references.map((ref, index) => (
                                    <div key={index} className="bg-card border border-border rounded-lg p-6">
                                        <p className="text-sm text-muted-foreground mb-2">{ref.citation}</p>
                                        <p className="text-xs text-primary">{ref.note}</p>
                                        <a
                                            href={ref.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-2 inline-flex min-h-11 items-center text-sm text-primary hover:underline"
                                        >
                                            View DOI
                                        </a>
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-muted-foreground text-center mt-6 italic">
                                Additional references available upon request. Contact us for a complete bibliography.
                            </p>
                        </FadeInOnScroll>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-16 bg-primary/10">
                    <div className="container mx-auto px-4 max-w-3xl text-center">
                        <FadeInOnScroll>
                            <h2 className="text-2xl md:text-3xl font-light text-foreground mb-6">
                                Ready to Order Terrein for Your Research?
                            </h2>
                            <p className="text-lg text-muted-foreground mb-4">
                                Submit a Request for Quotation to receive pricing and availability.
                            </p>
                            <p className="text-sm text-muted-foreground mb-8">
                                Available quantities: 5 mg (C$450) • 10 mg (C$800) • Custom quantities available
                            </p>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-block"
                            >
                                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/20">
                                    <Link href="/order?product=terrein&quantity=5mg" className="flex items-center gap-2">
                                        Request Quote
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

export default ProductsContent;
