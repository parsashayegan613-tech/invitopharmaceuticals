import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import FadeInOnScroll from "./animations/FadeInOnScroll";
import { Calendar, ArrowRight } from "lucide-react";

const LatestUpdates = () => {
  const updates = [
    {
      date: "January 2025",
      title: "Terrein Production Scaled Up",
      description: "Semi-industrial scale production now operational with improved yield and consistency."
    },
    {
      date: "December 2024",
      title: "Terrein Commercially Available",
      description: "High-purity Terrein (>95%) now available for research institutions worldwide."
    },
    {
      date: "November 2024",
      title: "Quality Documentation Updated",
      description: "New COA format with enhanced analytical data including UHPLC, NMR, and MS confirmation."
    }
  ];

  return (
    <section className="py-16 bg-section-alt">
      <div className="container mx-auto px-4">
        <FadeInOnScroll>
          <h2 className="section-title mb-12">Latest Updates</h2>
        </FadeInOnScroll>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
          {updates.map((update, index) => (
            <FadeInOnScroll key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -3 }}
                className="bg-card border border-border rounded-lg p-6 h-full hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-2 text-sm text-primary mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{update.date}</span>
                </div>
                <h4 className="text-lg font-medium text-foreground mb-2">{update.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{update.description}</p>
              </motion.div>
            </FadeInOnScroll>
          ))}
        </div>

        <FadeInOnScroll delay={0.4}>
          <div className="text-center">
            <Link 
              to="/contact-us" 
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Contact us for more information
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
};

export default LatestUpdates;
