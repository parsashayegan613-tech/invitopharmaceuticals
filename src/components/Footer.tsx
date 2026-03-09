"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, AlertTriangle, Linkedin } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Products", href: "/products" },
    { name: "Request Quote", href: "/order" },
    { name: "Our Team", href: "/our-team" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  const contactInfo = [
    { icon: MapPin, text: "Edmonton, AB, Canada" },
    { icon: Phone, text: "780.709.5678" },
    { icon: Mail, text: "info@invitvo.com" },
  ];

  return (
    <footer className="bg-foreground text-background">
      {/* RUO Disclaimer */}
      <div className="bg-foreground/95 border-b border-background/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-start gap-3 max-w-4xl mx-auto">
            <AlertTriangle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-background/70 leading-relaxed">
              <strong className="text-background/90">Research Use Only (RUO):</strong> All products sold by InVitvo Pharmaceuticals Ltd. are intended for research use only. Not for human or veterinary use. Not intended to diagnose, treat, cure, or prevent any disease.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold text-background tracking-wide">INVITVO</span>
              <span className="block text-xs text-background/70 tracking-widest">PHARMACEUTICALS LTD.</span>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed max-w-md mb-4">
              InVitvo Pharmaceuticals is a research-based scientific company dedicated to isolating, purifying and characterizing pharmacologically active secondary metabolites from natural resources.
            </p>
            <p className="text-background/60 text-xs">
              Based in Edmonton, Alberta, Canada
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
                    href={link.href}
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
                <div key={index} className="flex items-start gap-3">
                  <item.icon className="w-5 h-5 mt-0.5 text-primary" />
                  <span className="text-background/70 text-sm">{item.text}</span>
                </div>
              ))}
            </div>
            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://www.linkedin.com/company/invitvo-pharmaceuticals"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-9 h-9 bg-background/10 rounded-full hover:bg-primary/80 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:info@invitvo.com"
                className="inline-flex items-center justify-center w-9 h-9 bg-background/10 rounded-full hover:bg-primary/80 transition-colors duration-200"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/60">
            © {new Date().getFullYear()} InVitvo Pharmaceuticals Ltd. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-background/60">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
