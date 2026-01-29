import { motion } from "framer-motion";
import FadeInOnScroll from "./animations/FadeInOnScroll";
import StaggerContainer, { StaggerItem } from "./animations/StaggerContainer";
import research1 from "@/assets/research-1.png";
import research2 from "@/assets/research-2.png";
import research3 from "@/assets/research-3.png";

const Research = () => {
  const images = [
    { src: research1, alt: "Research thumbnail 1" },
    { src: research2, alt: "Research thumbnail 2" },
    { src: research3, alt: "Research thumbnail 3" },
  ];

  return (
    <section className="py-20 bg-section-alt">
      <div className="container mx-auto px-4">
        <FadeInOnScroll>
          <h2 className="section-title mb-12">Research project in pipeline</h2>
        </FadeInOnScroll>
        
        <div className="max-w-5xl mx-auto">
          <FadeInOnScroll delay={0.2}>
            <p className="text-muted-foreground leading-relaxed mb-12 text-center md:text-left">
              InVitvo Pharmaceuticals uses advanced analytical instrumentation for identification of the isolated secondary metabolites from natural resources. At the moment, our team is dedicated to scale up the production of a secondary metabolite called "Terrein" purified from Aspergillus terreus isolated from Canadian soil samples. This molecule has shown strong anticancer and antibiotic properties and has the potential to be commercialized. Terrein is produced in high yield in a specific designed media developed by InVitvo Pharmaceutical scientists in the lab scale. The structure of the purified Terrein is confirmed using Tandem Mass spectroscopy and NMR. The high yield of Terrein production in the media is measured by HPLC and calculated according to the calibration curve of the standard Terrein.
            </p>
          </FadeInOnScroll>

          {/* Research Images */}
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6" staggerDelay={0.15}>
            {images.map((image, index) => (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -3 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full aspect-[4/3] object-cover"
                  />
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};

export default Research;
