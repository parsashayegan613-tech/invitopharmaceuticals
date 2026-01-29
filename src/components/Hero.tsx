import { motion } from "framer-motion";
import heroImage from "@/assets/hero-scientist.jpg";

const Hero = () => {
  return (
    <section id="page-top" className="relative min-h-[500px] md:min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden">
      {/* Background Image with subtle zoom animation */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
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
            className="hero-title mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            InVitvo<br />
            Pharmaceuticals
          </motion.h1>
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            A breakthrough innovation in pharmaceutical biotechnology and fermentation
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-8"
          >
            <a 
              href="/about-us" 
              className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded font-medium 
                         hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25
                         hover:-translate-y-0.5"
            >
              Learn More
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
