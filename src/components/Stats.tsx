import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import FadeInOnScroll from "./animations/FadeInOnScroll";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Stats = () => {
  const stats = [
    { number: "2021", label: "Founded" },
    { number: ">95%", label: "Purity Level" },
    { number: "100+", label: "Research Partners" },
    { number: "Canada", label: "Based In" },
  ];

  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <FadeInOnScroll key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-sm md:text-base opacity-80">{stat.label}</div>
              </motion.div>
            </FadeInOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
