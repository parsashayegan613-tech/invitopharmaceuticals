"use client";

import { motion } from "framer-motion";
import pageHeroBg from "@/assets/page-hero-bg.jpg";
import logo from "@/assets/logo.png";

interface PageHeroProps {
  title: string;
  subtitle?: string;
}

// Helper to extract src from either a Next.js StaticImageData object or a plain string (Vite)
const getSrc = (img: { src: string } | string): string =>
  typeof img === "string" ? img : img.src;

const PageHero = ({ title, subtitle = "InVitvo Pharmaceuticals" }: PageHeroProps) => {
  return (
    <section className="relative min-h-[300px] md:min-h-[350px] flex items-center justify-center overflow-hidden">
      {/* Background Image with subtle animation */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${getSrc(pageHeroBg)})` }}
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-foreground/50" />
      </motion.div>

      {/* Logo Watermark Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getSrc(logo)}
          alt=""
          className="w-64 md:w-80 lg:w-96 h-auto opacity-[0.12]"
        />
      </div>

      {/* Content */}
      <div className="relative text-center z-10">
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {title}
        </motion.h1>
        <motion.p
          className="text-lg text-white/70"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
};

export default PageHero;
