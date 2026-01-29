import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Products", href: "/products" },
    { name: "Order", href: "/order" },
    { name: "Our Team", href: "/our-team" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  const contactInfo = [
    { icon: MapPin, value: "Edmonton, AB, Canada" },
    { icon: Phone, value: "780.709.5678" },
    { icon: Mail, value: "info@invitvo.com" },
  ];

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <img src={logo} alt="InVitvo Pharmaceuticals" className="h-16 w-auto brightness-0 invert" />
            </Link>
            <p className="text-background/70 text-sm leading-relaxed max-w-md">
              InVitvo Pharmaceuticals is a research-based scientific company dedicated to isolating, purifying and characterizing pharmacologically active secondary metabolites from natural resources.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-medium mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <motion.div
                  key={link.name}
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link 
                    to={link.href} 
                    className="text-background/70 hover:text-primary transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-medium mb-4">Contact</h4>
            <div className="space-y-3">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-sm text-background/70">
                  <item.icon className="w-4 h-4 text-primary" />
                  <span>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/60">
            © {new Date().getFullYear()} InVitvo Pharmaceuticals Ltd. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-background/60">
            <Link to="/contact-us" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/contact-us" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
