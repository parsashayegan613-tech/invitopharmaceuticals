"use client";

import { motion } from "framer-motion";
import FadeInOnScroll from "./animations/FadeInOnScroll";
import { Leaf } from "lucide-react";

const OurStory = () => {
    return (
        <section className="py-20 bg-section-alt">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <FadeInOnScroll>
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                            <Leaf className="w-8 h-8 text-primary" />
                        </div>
                        <h2 className="section-title mb-6">The Canadian Microorganism Advantage</h2>
                    </FadeInOnScroll>

                    <FadeInOnScroll delay={0.2}>
                        <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                            <p>
                                Founded in 2021 in Edmonton, Alberta, InVitvo Pharmaceuticals was built on a unique realization: the Canadian soil microbiome represents a vast, largely untapped reservoir of pharmacologically active secondary metabolites.
                            </p>
                            <p>
                                By isolating and purifying compounds directly from these specialized environmental niches, we bypass the supply chain vulnerabilities of traditional overseas sourcing. Our expert team leverages advanced chromatography and mass spectrometry to deliver research compounds like Terrein at &gt;95% purity—empowering local and international researchers with reliable, reproducible materials.
                            </p>
                        </div>
                    </FadeInOnScroll>
                </div>
            </div>
        </section>
    );
};

export default OurStory;
