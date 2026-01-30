import { motion } from "framer-motion";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";
import { Microscope, FlaskConical, Users, Target, Lightbulb, Award } from "lucide-react";

const AboutUs = () => {
  const coreValues = [
    {
      icon: Microscope,
      title: "Scientific Excellence",
      description: "Rigorous research methodologies and advanced analytical instrumentation"
    },
    {
      icon: FlaskConical,
      title: "Innovation",
      description: "Pioneering new approaches in pharmaceutical biotechnology"
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Building partnerships with researchers and institutions worldwide"
    },
    {
      icon: Award,
      title: "Quality",
      description: "Commitment to the highest standards in every product we develop"
    },
  ];

  const milestones = [
    { year: "2021", event: "InVitvo Pharmaceuticals founded in Edmonton, Alberta" },
    { year: "2022", event: "Successful isolation of Terrein from Canadian soil samples" },
    { year: "2023", event: "Scaled up Terrein production to semi-industrial level" },
    { year: "2024", event: "Commercialized Terrein for research purposes" },
    { year: "2025", event: "Development of Terrein prodrug for cancer treatment" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <main className="flex-grow">
        <PageHero title="About us" />
        
        {/* Company Overview */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <FadeInOnScroll>
              <h3 className="text-xl md:text-2xl text-primary font-medium mb-8">InVitvo Pharmaceuticals Ltd.</h3>
            </FadeInOnScroll>
            <FadeInOnScroll delay={0.2}>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                InVitvo Pharmaceuticals is a research-based scientific company dedicated to isolating, purifying, and characterizing pharmacologically active secondary metabolites from natural resources, including microorganisms. InVitvo Pharmaceuticals was founded in 2021 by a group of experienced pharmaceutical scientists and soon became a home for research scientists in the fields of medicinal and analytical chemistry, pharmacology, and microbiology. InVitvo Pharmaceuticals has great potential to grow and become the leading company of its kind in Canada.
              </p>
            </FadeInOnScroll>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-16 bg-section-alt">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-12">
              <FadeInOnScroll direction="left">
                <div className="text-center md:text-left">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                    <Target className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-medium text-foreground mb-4">Our Vision</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    To become the leading pharmaceutical company in Canada specializing in natural product discovery and development, providing innovative therapeutic solutions derived from Canadian biodiversity.
                  </p>
                </div>
              </FadeInOnScroll>
              <FadeInOnScroll direction="right" delay={0.2}>
                <div className="text-center md:text-left">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                    <Lightbulb className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-medium text-foreground mb-4">Our Mission</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Providing the best possible pharmaceutical products derived from microorganisms isolated from the Canadian environment, through rigorous scientific research and innovative biotechnology.
                  </p>
                </div>
              </FadeInOnScroll>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <FadeInOnScroll>
              <h2 className="section-title mb-12">Our Core Values</h2>
            </FadeInOnScroll>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreValues.map((value, index) => (
                <FadeInOnScroll key={index} delay={index * 0.1} className="h-full">
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300 h-full"
                  >
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-full mb-4">
                      <value.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h4 className="text-lg font-medium text-foreground mb-2">{value.title}</h4>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </motion.div>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 bg-section-alt">
          <div className="container mx-auto px-4 max-w-3xl">
            <FadeInOnScroll>
              <h2 className="section-title mb-12">Our Journey</h2>
            </FadeInOnScroll>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/30 transform md:-translate-x-1/2" />
              
              {milestones.map((milestone, index) => (
                <FadeInOnScroll key={index} delay={index * 0.1}>
                  <div className={`relative flex items-center mb-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Dot */}
                    <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 z-10" />
                    
                    {/* Content */}
                    <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-card border border-border rounded-lg p-4 inline-block"
                      >
                        <span className="text-primary font-bold text-lg">{milestone.year}</span>
                        <p className="text-muted-foreground mt-1">{milestone.event}</p>
                      </motion.div>
                    </div>
                  </div>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
