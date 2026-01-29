import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <main className="flex-grow">
        <PageHero title="About us" />
        
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <FadeInOnScroll>
              <h3 className="text-lg text-muted-foreground mb-6">InVitvo Pharmaceuticals Ltd.</h3>
            </FadeInOnScroll>
            <FadeInOnScroll delay={0.2}>
              <p className="text-muted-foreground leading-relaxed">
                InVitvo Pharmaceuticals is a research- based scientific company dedicated to isolate, purify and characterize the pharmacologically active secondary metabolites from natural resources including microorganisms. InVitvo Pharmaceuticals was founded in 2021 by a group of young and energetic pharmaceutical scientists and soon became the home for research scientists in the field of medicinal and analytical chemistry, pharmacology and microbiology. InVitvo Pharmaceuticals has great potential to grow and become the leading company in its own kind in Canada.
              </p>
            </FadeInOnScroll>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
