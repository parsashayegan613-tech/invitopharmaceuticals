import { motion } from "framer-motion";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";
import drAnoosh from "@/assets/dr-anoosh.jpg";
import heidi from "@/assets/heidi.jpg";

const OurTeam = () => {
  const teamMembers = [
    {
      name: "Anooshirvan Shayeganpour PhD",
      role: "President and Founder",
      image: drAnoosh,
      description: "Dr. Anooshirvan Shayeganpour brings over 20 years of experience in pharmaceutical sciences and biotechnology. With a PhD in pharmaceutical sciences, he has led numerous research initiatives in drug discovery and natural product development. His expertise in analytical chemistry and pharmacokinetics has been instrumental in establishing InVitvo Pharmaceuticals as a leader in microbial secondary metabolite research.",
    },
    {
      name: "Heidi Rashidi Pharm D",
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
        <PageHero title="Our team" />
        
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
                      <h3 className="text-xl font-medium text-foreground mb-2">
                        {member.name}
                      </h3>
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
