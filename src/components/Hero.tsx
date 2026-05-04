"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-scientist.jpg";
import { trackEvent } from "@/lib/analytics";
import { terrein } from "@/lib/terrein";

const Hero = () => {
  return (
    <section id="page-top" className="relative min-h-[500px] md:min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden">
      {/* Background Image with subtle zoom animation */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${typeof heroImage === "string" ? heroImage : (heroImage as { src: string }).src})` }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {/* Enhanced Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/20" />
      </motion.div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-16">
        <div className="max-w-xl">
          <motion.h1
            className="hero-title mb-6 font-bold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Precision Research<br />
            Compounds.
          </motion.h1>
          <motion.p
            className="hero-subtitle mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Microbial Metabolite Discovery & Purification
          </motion.p>
          <motion.p
            className="text-base md:text-lg text-white/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            High-purity research compounds from Canadian soil microorganisms. Advanced analytical characterization with full documentation.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link
              href="/products/terrein"
              onClick={() => trackEvent("cta_clicked", { location: "homepage_hero", destination: "products_terrein" })}
              className="inline-block bg-accent text-accent-foreground px-8 py-3 rounded font-medium 
                         hover:bg-accent/90 transition-all duration-300 hover:shadow-lg hover:shadow-accent/25
                         hover:-translate-y-0.5"
            >
              View Terrein CAS {terrein.cas}
            </Link>
            <Link
              href="/order?product=terrein&quantity=5mg"
              onClick={() => trackEvent("cta_clicked", { location: "homepage_hero", destination: "order", compound: terrein.name, quantity: "5 mg" })}
              className="inline-block bg-white/10 text-white border border-white/30 px-8 py-3 rounded font-medium 
                         hover:bg-white/20 transition-all duration-300 hover:-translate-y-0.5"
            >
              Request Quote
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
