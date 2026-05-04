"use client";

import { motion } from "framer-motion";
import FadeInOnScroll from "./animations/FadeInOnScroll";
import { School, Building2, Microscope } from "lucide-react";

const WhyInVitvo = () => {
    return (
        <section className="py-24 bg-section-alt">
            <div className="container mx-auto px-4">
                <FadeInOnScroll>
                    <h2 className="section-title mb-16 text-center">Why Researchers Choose Us</h2>
                </FadeInOnScroll>

                <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto items-center">
                    <FadeInOnScroll delay={0.2}>
                        <div className="space-y-6">
                            <h3 className="text-2xl md:text-3xl font-light text-foreground leading-snug">
                                Trusted by academic and industrial labs across North America
                            </h3>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Procurement departments and lead researchers rely on InVitvo Pharmaceuticals for our transparent documentation, uncompromised purity, and rapid shipping times.
                                We bridge the gap between niche natural product discovery and reliable commercial supply.
                            </p>
                            <ul className="space-y-4 pt-4">
                                {[
                                    "Independently verified >95% purity",
                                    "Immediate dispatch for in-stock compounds",
                                    "Dedicated scientific support team"
                                ].map((text, i) => (
                                    <li key={i} className="flex items-center gap-3 text-lg text-foreground/80">
                                        <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                                        <span>{text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </FadeInOnScroll>

                    <FadeInOnScroll delay={0.4}>
                        <div className="bg-card border border-border p-8 md:p-10 rounded-2xl relative shadow-md hover:shadow-lg transition-shadow">
                            <h4 className="text-xl font-medium text-foreground mb-8">Who We Serve</h4>

                            <div className="space-y-8">
                                <div className="flex gap-4">
                                    <div className="mt-1 shrink-0">
                                        <School className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-foreground text-lg">Academic Institutions</p>
                                        <p className="text-muted-foreground text-sm mt-1 leading-relaxed">University labs and PIs requiring consistent, high-purity compounds for reproducible biological studies.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="mt-1 shrink-0">
                                        <Building2 className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-foreground text-lg">Pharmaceutical R&D</p>
                                        <p className="text-muted-foreground text-sm mt-1 leading-relaxed">Biotech firms and researchers using unique metabolites for assay development and laboratory model systems.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="mt-1 shrink-0">
                                        <Microscope className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-foreground text-lg">Contract Research (CROs)</p>
                                        <p className="text-muted-foreground text-sm mt-1 leading-relaxed">Organizations needing a reliable North American supply chain without unpredictable overseas shipping delays.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeInOnScroll>
                </div>
            </div>
        </section>
    );
};

export default WhyInVitvo;
