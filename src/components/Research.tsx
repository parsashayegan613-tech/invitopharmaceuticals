"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import FadeInOnScroll from "./animations/FadeInOnScroll";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import research1 from "@/assets/research-1.png";
import research2 from "@/assets/research-2.png";
import research3 from "@/assets/research-3.png";

const Research = () => {
  const images = [
    { src: research1, alt: "Microscopy research image 1" },
    { src: research2, alt: "Microscopy research image 2" },
    { src: research3, alt: "Microscopy research image 3" },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <FadeInOnScroll>
          <h2 className="section-title mb-12">Research Pipeline</h2>
        </FadeInOnScroll>

        <div className="max-w-5xl mx-auto">
          <FadeInOnScroll delay={0.2}>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6 text-center md:text-left">
              Our current research focuses on the synthesis and characterization of novel Terrein prodrugs. Preclinical studies have demonstrated promising pharmacokinetic and pharmacodynamic (PKPD) properties. Biological activity has been reported in peer-reviewed literature, including potential applications in cancer research models.
            </p>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.3}>
            <div className="bg-muted/50 border border-border rounded-lg p-4 mb-8">
              <p className="text-sm text-muted-foreground italic">
                <strong>Note:</strong> Research compounds are provided for laboratory investigation only. Reported biological activities are based on preclinical studies and peer-reviewed literature. Products are not intended for therapeutic use.
              </p>
            </div>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.4}>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10 text-center md:text-left">
              InVitvo Pharmaceuticals welcomes collaboration inquiries from academic institutions and industry partners interested in natural product research.
            </p>
          </FadeInOnScroll>

          {/* Research Images - Side by Side */}
          <FadeInOnScroll delay={0.5}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              {images.map((image, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={typeof image.src === "string" ? image.src : (image.src as { src: string }).src}
                    alt={image.alt}
                    className="w-full h-auto object-contain"
                  />
                </motion.div>
              ))}
            </div>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.6}>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link href="/products" className="flex items-center gap-2">
                    View Products
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button asChild variant="outline">
                  <Link href="/contact-us" className="flex items-center gap-2">
                    Contact Us
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
