import heroImage from "@/assets/hero-scientist.jpg";

const Hero = () => {
  return (
    <section id="page-top" className="relative min-h-[500px] md:min-h-[600px] flex items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-16">
        <div className="max-w-xl">
          <h1 className="hero-title mb-6">
            InVitvo<br />
            Pharmaceuticals
          </h1>
          <p className="hero-subtitle">
            A breakthrough innovation in pharmaceutical biotechnology and fermentation
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
