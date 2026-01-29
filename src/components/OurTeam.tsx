const OurTeam = () => {
  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Scientific Officer",
      description: "Ph.D. in Microbiology with 15+ years of experience in pharmaceutical research.",
    },
    {
      name: "Dr. Michael Chen",
      role: "Head of Research",
      description: "Expert in natural product chemistry and fermentation technology.",
    },
    {
      name: "Dr. Emily Williams",
      role: "Lead Biochemist",
      description: "Specializes in metabolite identification and structural analysis.",
    },
  ];

  return (
    <section id="team" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="section-title mb-12">Our Team</h2>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="text-center p-6 rounded-lg bg-section-alt"
            >
              <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl text-primary font-light">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">{member.name}</h3>
              <p className="text-primary text-sm mb-3">{member.role}</p>
              <p className="text-muted-foreground text-sm">{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
