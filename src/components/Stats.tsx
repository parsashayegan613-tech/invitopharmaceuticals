"use client";

import { motion } from "framer-motion";
import FadeInOnScroll from "./animations/FadeInOnScroll";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Stats = () => {
  const stats = [
    { number: "2021", label: "Founded" },
    { number: ">95%", label: "Purity (UHPLC)" },
    { number: "5–7 Days", label: "Delivery (Canada)" },
    { number: "Canada", label: "Based In" },
  ];

  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto mb-12">
          {stats.map((stat, index) => (
            <FadeInOnScroll key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-accent">{stat.number}</div>
                <div className="text-sm md:text-base text-white/90 font-medium">{stat.label}</div>
              </motion.div>
            </FadeInOnScroll>
          ))}
        </div>

        <FadeInOnScroll delay={0.5}>
          <div className="text-center">
            <p className="text-lg md:text-xl font-medium mb-6">Ready to order? Get a quote in under 2 minutes.</p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
              <Link
                href="/order?product=terrein&quantity=5mg"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3 rounded font-semibold hover:bg-accent/90 transition-colors shadow-lg shadow-accent/20"
              >
                Request Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
};

export default Stats;
