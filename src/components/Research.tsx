import { Link } from "react-router-dom";
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
    <section className="py-20 bg-section-alt">
      <div className="container mx-auto px-4">
        <FadeInOnScroll>
          <h2 className="section-title mb-12">Research projects in pipeline</h2>
        </FadeInOnScroll>
        
        <div className="max-w-5xl mx-auto">
          <FadeInOnScroll delay={0.2}>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 text-center md:text-left">
              The latest research project is related to the synthesis of a new prodrug of Terrein dedicated to being used in In vivo scale for cancer treatment. Our team has designed a cancer cell targeted molecule with desirable PKPD properties. At the moment, this molecule is in preclinical scale and showed desirable properties.
            </p>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.3}>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10 text-center md:text-left">
              InVitvo Pharmaceuticals invites investors to visit our website and contact our research team for more information about this molecule.
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
                  <img 
                    src={image.src} 
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
                  <Link to="/products" className="flex items-center gap-2">
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
                  <Link to="/contact-us" className="flex items-center gap-2">
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
