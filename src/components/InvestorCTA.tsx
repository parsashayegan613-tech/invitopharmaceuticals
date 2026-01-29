import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import FadeInOnScroll from "./animations/FadeInOnScroll";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const InvestorCTA = () => {
  return (
    <section className="py-16 bg-foreground text-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <FadeInOnScroll>
          <div className="text-center md:text-left md:flex md:items-center md:justify-between gap-8">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-light mb-4">
                Interested in Investing?
              </h2>
              <p className="text-background/70 text-lg">
                InVitvo Pharmaceuticals invites investors to visit our website and contact our research team for more information about investing in the industrial scale production of Terrein.
              </p>
            </div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-shrink-0"
            >
              <Button 
                asChild 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Link to="/contact-us" className="flex items-center gap-2">
                  Get Started Today
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
};

export default InvestorCTA;
