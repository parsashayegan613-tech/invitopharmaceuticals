import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Products = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <main className="flex-grow">
        <PageHero title="Products" />
        
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <FadeInOnScroll>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                InVitvo Pharmaceuticals uses advanced analytical instrumentation for identification of the isolated secondary metabolites from natural resources. At the moment, our team has scaled up and commercialized the production of a secondary metabolite called "Terrein" purified from <em>Aspergillus terreus</em> isolated from Canadian soil samples. This molecule has shown strong anticancer and antibiotic properties. Terrein is produced in high yield in a specific designed media developed by InVitvo Pharmaceuticals scientists in the semi-industrial scale. The structure of the purified Terrein is confirmed using Tandem Mass spectroscopy and NMR. The high yield of Terrein production in the media is measured by UHPLC and calculated according to the calibration curve of the standard Terrein.
              </p>
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.2}>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                This molecule is ready to be ordered for different research purposes.
              </p>
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.3}>
              <div className="flex justify-center">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Link to="/order" className="flex items-center gap-2">
                      View Order Page
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </FadeInOnScroll>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
