"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import FadeInOnScroll from "./animations/FadeInOnScroll";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import research1 from "@/assets/research-1.png";
import research2 from "@/assets/research-2.png";
import research3 from "@/assets/research-3.png";
import { terrein } from "@/lib/terrein";

const Research = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Full Bleed Background with subtle animation */}
      <div className="absolute inset-0 bg-zinc-950" /> {/* Dark dark background to blend edges */}
      <motion.div
        className="absolute inset-0 bg-contain bg-center bg-no-repeat opacity-50"
        style={{ backgroundImage: `url(${research1.src})` }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        viewport={{ once: true }}
      />

      {/* Subtle Dark Overlay */}
      <div className="absolute inset-0 bg-foreground/60 mix-blend-multiply pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4">
        <FadeInOnScroll>
          <h2 className="text-4xl md:text-5xl font-light text-white mb-12 text-center">Research Pipeline</h2>
        </FadeInOnScroll>

        <div className="max-w-4xl mx-auto">
          <FadeInOnScroll delay={0.2}>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8 text-center md:text-left">
              Our current research focuses on synthesis and analytical characterization of Terrein derivatives. Reported biological activities should be interpreted only in the context of cited laboratory and <em>in vitro</em> literature.
            </p>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.3}>
            <div className="bg-background/10 backdrop-blur-md border border-white/20 rounded-lg p-6 mb-10">
              <p className="text-sm md:text-base text-white/80 italic">
                <strong className="text-white">Note:</strong> Research compounds are provided for laboratory investigation only. Reported biological activities are based on peer-reviewed laboratory literature. Products are not intended for human, veterinary, diagnostic, clinical, or therapeutic use.
              </p>
            </div>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.4}>
            <p className="text-lg text-white/90 leading-relaxed mb-12 text-center md:text-left">
              InVitvo Pharmaceuticals welcomes collaboration inquiries from academic institutions and industry partners interested in natural product research.
            </p>
          </FadeInOnScroll>

          {/* Additional Microscopy/Analytical Data Images */}
          <FadeInOnScroll delay={0.45}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="overflow-hidden rounded-lg shadow-2xl border border-white/20 bg-background/10 backdrop-blur-sm p-2"
              >
                <Image
                  src={research2}
                  alt="UHPLC chromatogram showing >95% Terrein purity"
                  placeholder="blur"
                  className="w-full h-auto rounded object-contain"
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="overflow-hidden rounded-lg shadow-2xl border border-white/20 bg-background/10 backdrop-blur-sm p-2"
              >
                <Image
                  src={research3}
                  alt={`Terrein molecular structure ${terrein.formula} CAS ${terrein.cas} and metabolite analysis`}
                  placeholder="blur"
                  className="w-full h-auto rounded object-contain"
                />
              </motion.div>
            </div>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.5}>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/20">
                  <Link href="/products/terrein" className="flex items-center gap-2">
                    View Terrein CAS {terrein.cas}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button asChild variant="outline" size="lg" className="bg-transparent text-white border-white/30 hover:bg-white/10 hover:text-white">
                  <Link href="/contact-us" className="flex items-center gap-2">
                    Request Your COA Sample Pack
                  </Link>
                </Button>
              </motion.div>
            </div>
          </FadeInOnScroll>
        </div>
      </div>
    </section>
  );
};

export default Research;
