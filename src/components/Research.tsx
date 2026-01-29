import research1 from "@/assets/research-1.png";
import research2 from "@/assets/research-2.png";
import research3 from "@/assets/research-3.png";

const Research = () => {
  return (
    <section className="py-20 bg-section-alt">
      <div className="container mx-auto px-4">
        <h2 className="section-title mb-12">Research project in pipeline</h2>
        
        <div className="max-w-5xl mx-auto">
          <p className="text-muted-foreground leading-relaxed mb-12 text-center md:text-left">
            InVitvo Pharmaceuticals uses advanced analytical instrumentation for identification of the isolated secondary metabolites from natural resources. At the moment, our team is dedicated to scale up the production of a secondary metabolite called "Terrein" purified from Aspergillus terreus isolated from Canadian soil samples. This molecule has shown strong anticancer and antibiotic properties and has the potential to be commercialized. Terrein is produced in high yield in a specific designed media developed by InVitvo Pharmaceutical scientists in the lab scale. The structure of the purified Terrein is confirmed using Tandem Mass spectroscopy and NMR. The high yield of Terrein production in the media is measured by HPLC and calculated according to the calibration curve of the standard Terrein.
          </p>

          {/* Research Images */}
          <div className="flex flex-wrap justify-center gap-6">
            <img 
              src={research1} 
              alt="Research thumbnail 1" 
              className="w-48 h-48 object-cover rounded shadow-md"
            />
            <img 
              src={research2} 
              alt="Research thumbnail 2" 
              className="w-48 h-48 object-cover rounded shadow-md"
            />
            <img 
              src={research3} 
              alt="Research thumbnail 3" 
              className="w-48 h-48 object-cover rounded shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Research;
