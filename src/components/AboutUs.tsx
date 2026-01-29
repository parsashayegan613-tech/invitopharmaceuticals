const AboutUs = () => {
  return (
    <section id="about" className="py-20 bg-section-alt">
      <div className="container mx-auto px-4">
        <h2 className="section-title mb-12">About Us</h2>
        
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-muted-foreground leading-relaxed mb-6">
            InVitvo Pharmaceuticals is a Canadian biotechnology company dedicated to discovering and developing novel pharmaceutical compounds from natural sources. Founded with a vision to harness the power of microorganisms found in the Canadian environment, we are committed to advancing healthcare through innovative research and development.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Our state-of-the-art laboratory facilities and experienced team of scientists work tirelessly to identify, isolate, and develop promising compounds that have the potential to address unmet medical needs. We believe in the power of nature to provide solutions for some of the most challenging health conditions facing humanity today.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
