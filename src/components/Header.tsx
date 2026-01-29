import { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#page-top", active: true },
    { name: "About Us", href: "#about" },
    { name: "Our Team", href: "#team" },
    { name: "Contact Us", href: "#contact" },
  ];

  return (
    <header className="bg-background py-4 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#page-top" className="text-xl md:text-2xl font-light tracking-wide">
          <span className="text-primary font-normal">IN</span>
          <span className="text-nav">VITVO</span>
          <span className="text-nav font-semibold ml-1">PHARMACEUTICALS</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={link.active ? "nav-link-active" : "nav-link"}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-nav"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-background border-t border-border mt-4 py-4">
          <div className="container mx-auto px-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={link.active ? "nav-link-active" : "nav-link"}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
