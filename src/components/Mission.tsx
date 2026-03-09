"use client";

import { motion } from "framer-motion";
import FadeInOnScroll from "./animations/FadeInOnScroll";
import { FileCheck, MapPin, FlaskConical } from "lucide-react";

const Mission = () => {
  const trustCards = [
    {
      icon: FileCheck,
      title: "Tired of missing documentation?",
      description: "Get full transparency. Every order includes a detailed Certificate of Analysis and complete Safety Data Sheets."
    },
    {
      icon: MapPin,
      title: "No 3-week overseas waits",
      description: "Based in Edmonton, Canada. We offer rapid, reliable North American shipping and highly responsive support."
    },
    {
      icon: FlaskConical,
      title: "Demanding purity requirements?",
      description: "Our compounds are independently verified for >95% purity, ensuring consistent, reproducible research results."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Mission Statement */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <FadeInOnScroll>
            <h2 className="section-title mb-8">Our Mission</h2>
          </FadeInOnScroll>
          <FadeInOnScroll delay={0.2}>
            <p className="text-lg md:text-xl text-muted-foreground font-light italic leading-relaxed">
              Providing high-purity research compounds derived from microorganisms isolated from the Canadian environment, with complete analytical documentation and quality assurance.
            </p>
          </FadeInOnScroll>
        </div>

        {/* Trust Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {trustCards.map((card, index) => (
            <FadeInOnScroll key={index} delay={index * 0.15}>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300 h-full"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-full mb-4">
                  <card.icon className="w-7 h-7 text-primary" />
                </div>
                <h4 className="text-lg font-medium text-foreground mb-2">{card.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.description}</p>
              </motion.div>
            </FadeInOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mission;
