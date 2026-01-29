import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  const footerLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Products", href: "/products" },
    { name: "Order", href: "/order" },
    { name: "Our Team", href: "/our-team" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  return (
    <footer className="bg-background border-t border-border py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="text-lg font-light tracking-wide group">
            <span className="text-primary font-normal transition-colors group-hover:text-primary/80">IN</span>
            <span className="text-nav">VITVO</span>
            <span className="text-nav font-semibold ml-1">PHARMACEUTICALS</span>
          </Link>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-6 text-sm">
            {footerLinks.map((link) => (
              <motion.div
                key={link.name}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <Link 
                  to={link.href} 
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} InVitvo Pharmaceuticals</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
