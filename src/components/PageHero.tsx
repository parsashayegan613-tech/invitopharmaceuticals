import pageHeroBg from "@/assets/page-hero-bg.jpg";

interface PageHeroProps {
  title: string;
  subtitle?: string;
}

const PageHero = ({ title, subtitle = "invitvo" }: PageHeroProps) => {
  return (
    <section className="relative min-h-[300px] md:min-h-[350px] flex items-center justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${pageHeroBg})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-foreground/60" />
      </div>

      {/* Content */}
      <div className="relative text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4">
          {title}
        </h1>
        <p className="text-lg text-white/70">{subtitle}</p>
      </div>
    </section>
  );
};

export default PageHero;
