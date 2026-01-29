import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Our Team", href: "/our-team" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname === href;
  };

  return (
    <header className="bg-background py-4 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="text-xl md:text-2xl font-light tracking-wide group"
        >
          <span className="text-primary font-normal transition-colors group-hover:text-primary/80">IN</span>
          <span className="text-nav">VITVO</span>
          <span className="text-nav font-semibold ml-1">PHARMACEUTICALS</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`relative ${isActive(link.href) ? "nav-link-active" : "nav-link"} 
                         after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 
                         after:bg-primary after:scale-x-0 after:origin-right after:transition-transform 
                         after:duration-300 hover:after:scale-x-100 hover:after:origin-left`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden text-nav"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          whileTap={{ scale: 0.95 }}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav 
            className="md:hidden bg-background border-t border-border mt-4 py-4 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="container mx-auto px-4 flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.href}
                    className={isActive(link.href) ? "nav-link-active" : "nav-link"}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
