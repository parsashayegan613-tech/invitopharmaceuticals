import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Beaker, Activity, Award } from "lucide-react";
import terreinMolecule from "@/assets/terrein-molecule.png";

const Products = () => {
  const features = [
    {
      icon: Shield,
      title: "Purity >95%",
      description: "Highly purified compound verified by UHPLC analysis"
    },
    {
      icon: Activity,
      title: "Anticancer Properties",
      description: "Demonstrated strong anticancer activity in research studies"
    },
    {
      icon: Beaker,
      title: "Antibiotic Properties",
      description: "Shown effective antibiotic characteristics"
    },
    {
      icon: Award,
      title: "Research Grade",
      description: "Suitable for various research applications"
    },
  ];

  const specifications = [
    { label: "Chemical Name", value: "Terrein" },
    { label: "Molecular Formula", value: "C₈H₁₀O₃" },
    { label: "Molecular Weight", value: "154.16 g/mol" },
    { label: "Purity", value: ">95% (UHPLC)" },
    { label: "Source", value: "Aspergillus terreus" },
    { label: "Origin", value: "Canadian soil samples" },
    { label: "Structure Confirmation", value: "Tandem MS & NMR" },
    { label: "Production Scale", value: "Semi-industrial" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <main className="flex-grow">
        <PageHero title="Products" />
        
        {/* Product Overview */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <FadeInOnScroll direction="left">
                <div>
                  <h2 className="text-3xl font-light text-foreground mb-6">Terrein</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    InVitvo Pharmaceuticals uses advanced analytical instrumentation for identification of the isolated secondary metabolites from natural resources. At the moment, our team has scaled up and commercialized the production of a secondary metabolite called "Terrein" purified from <em>Aspergillus terreus</em> isolated from Canadian soil samples.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    This molecule has shown strong anticancer and antibiotic properties. Terrein is produced in high yield in a specific designed media developed by InVitvo Pharmaceuticals scientists in the semi-industrial scale.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    The structure of the purified Terrein is confirmed using Tandem Mass spectroscopy and NMR. The high yield of Terrein production in the media is measured by UHPLC and calculated according to the calibration curve of the standard Terrein.
                  </p>
                </div>
              </FadeInOnScroll>
              <FadeInOnScroll direction="right" delay={0.2}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-card border border-border rounded-lg p-8 text-center"
                >
                  <img 
                    src={terreinMolecule} 
                    alt="Terrein molecular structure" 
                    className="w-full max-w-xs mx-auto mb-4"
                  />
                  <p className="text-sm text-muted-foreground">Terrein Molecular Structure (C₈H₁₀O₃)</p>
                </motion.div>
              </FadeInOnScroll>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-section-alt">
          <div className="container mx-auto px-4 max-w-5xl">
            <FadeInOnScroll>
              <h2 className="section-title mb-12">Product Features</h2>
            </FadeInOnScroll>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <FadeInOnScroll key={index} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-full mb-4">
                      <feature.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h4 className="text-lg font-medium text-foreground mb-2">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </motion.div>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Specifications */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <FadeInOnScroll>
              <h2 className="section-title mb-12">Technical Specifications</h2>
            </FadeInOnScroll>
            <FadeInOnScroll delay={0.2}>
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <table className="w-full">
                  <tbody className="divide-y divide-border">
                    {specifications.map((spec, index) => (
                      <tr key={index} className="hover:bg-muted/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-foreground">{spec.label}</td>
                        <td className="px-6 py-4 text-muted-foreground text-right">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </FadeInOnScroll>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary/10">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <FadeInOnScroll>
              <h2 className="text-2xl md:text-3xl font-light text-foreground mb-6">
                Ready to Order Terrein for Your Research?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                This molecule is ready to be ordered for different research purposes.
              </p>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block"
              >
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link to="/order" className="flex items-center gap-2">
                    View Order Page
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </motion.div>
            </FadeInOnScroll>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
