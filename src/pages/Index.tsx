import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Mission from "@/components/Mission";
import Stats from "@/components/Stats";
import Research from "@/components/Research";
import InvestorCTA from "@/components/InvestorCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <main className="flex-grow">
        <Hero />
        <Mission />
        <Stats />
        <Research />
        <InvestorCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
