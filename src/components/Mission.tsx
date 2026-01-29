import FadeInOnScroll from "./animations/FadeInOnScroll";

const Mission = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 text-center max-w-4xl">
        <FadeInOnScroll>
          <h2 className="section-title mb-8">Mission</h2>
        </FadeInOnScroll>
        <FadeInOnScroll delay={0.2}>
          <p className="text-lg md:text-xl text-muted-foreground font-light italic leading-relaxed">
            Providing the best possible pharmaceutical products derived from microorganism isolated from Canadian environment.
          </p>
        </FadeInOnScroll>
      </div>
    </section>
  );
};

export default Mission;
