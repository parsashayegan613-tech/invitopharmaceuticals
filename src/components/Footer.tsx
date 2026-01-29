import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-light mb-4">
              <span className="text-primary">IN</span>VITVO PHARMACEUTICALS
            </h3>
            <p className="text-background/70 text-sm">
              A breakthrough innovation in pharmaceutical biotechnology and fermentation.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-medium mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-background/70">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Edmonton, AB</span>
              </div>
              <div className="flex items-center gap-3 text-background/70">
                <Phone className="w-4 h-4 text-primary" />
                <span>780-709-5678</span>
              </div>
              <div className="flex items-center gap-3 text-background/70">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:info@invitvo.com" className="hover:text-primary transition-colors">
                  info@invitvo.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-medium mb-4">Quick Links</h4>
            <nav className="space-y-2 text-sm">
              <a href="#page-top" className="block text-background/70 hover:text-primary transition-colors">Home</a>
              <a href="#about" className="block text-background/70 hover:text-primary transition-colors">About Us</a>
              <a href="#team" className="block text-background/70 hover:text-primary transition-colors">Our Team</a>
              <a href="#contact" className="block text-background/70 hover:text-primary transition-colors">Contact Us</a>
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-background/20 mt-10 pt-6 text-center text-sm text-background/50">
          <p>© {new Date().getFullYear()} InVitvo Pharmaceuticals. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
