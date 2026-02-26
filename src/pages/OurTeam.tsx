import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";
import drAnoosh from "@/assets/dr-anoosh.jpg";
import heidi from "@/assets/heidi.jpg";
import { usePageTitle } from "@/hooks/use-page-title";

const OurTeam = () => {
  usePageTitle("Our Team");
  const teamMembers = [
    {
      name: "Anooshirvan Shayeganpour, Ph.D.",
      role: "Founder & CEO",
      image: drAnoosh,
      linkedin: "https://www.linkedin.com/in/anoosh-shayeganpour-109679201/",
      description: "Dr. Anooshirvan Shayeganpour is the visionary behind InVitvo Pharmaceuticals, bringing over two decades of expertise in pharmaceutical sciences and drug development. He holds a Ph.D. in Pharmaceutical Sciences from the University of Alberta and previously served as an Associate Professor at Saba University School of Medicine. A prolific researcher with over 21 peer-reviewed publications and book chapters and 1,300+ citations, Dr. Shayeganpour specializes in pharmacokinetics, drug metabolism, and the complex interplay between the gut microbiome and CYP450 enzymes. His expertise in advanced analytical techniques including LC-MS has been instrumental in establishing InVitvo as a leader in high-purity microbial secondary metabolite research.",
    },
    {
      name: "Heidi Rashidi, Pharm.D.",
      role: "Co-Founder",
      image: heidi,
      description: "Dr. Heidi Rashidi holds a Doctor of Pharmacy degree and brings extensive experience in clinical pharmacy and pharmaceutical research. Her background in drug formulation and quality assurance has been vital to developing InVitvo's high-purity products. She oversees the company's quality control processes and regulatory compliance.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <main className="flex-grow">
        <PageHero title="Our Team" />

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            {teamMembers.map((member, index) => (
              <FadeInOnScroll key={index} delay={index * 0.15}>
                <div>
                  <div className="flex flex-col md:flex-row items-start gap-8 py-8">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                    >
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full md:w-56 h-auto object-cover"
                      />
                    </motion.div>
                    <div className="flex flex-col justify-center flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-medium text-foreground">
                          {member.name}
                        </h3>
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                            aria-label={`${member.name} on LinkedIn`}
                          >
                            <Linkedin className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                      <p className="text-primary mb-4">{member.role}</p>
                      <p className="text-muted-foreground leading-relaxed">
                        {member.description}
                      </p>
                    </div>
                  </div>
                  {index < teamMembers.length - 1 && (
                    <hr className="border-border" />
                  )}
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default OurTeam;
