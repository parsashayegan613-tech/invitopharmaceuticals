import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="text-lg font-light tracking-wide">
            <span className="text-primary font-normal">IN</span>
            <span className="text-nav">VITVO</span>
            <span className="text-nav font-semibold ml-1">PHARMACEUTICALS</span>
          </Link>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-6 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/about-us" className="text-muted-foreground hover:text-primary transition-colors">
              About Us
            </Link>
            <Link to="/our-team" className="text-muted-foreground hover:text-primary transition-colors">
              Our Team
            </Link>
            <Link to="/contact-us" className="text-muted-foreground hover:text-primary transition-colors">
              Contact Us
            </Link>
          </nav>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} InVitvo Pharmaceuticals . Built using WordPress and the Mesmerize Theme</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
