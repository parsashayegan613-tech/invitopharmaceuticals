"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Products", href: "/products" },
    { name: "Request Quote", href: "/order" },
    { name: "Our Team", href: "/our-team" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href;
  };

  return (
    <header className="bg-background py-3 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Text Logo */}
        <Link
          href="/"
          className="flex flex-col group"
        >
          <span className="text-2xl md:text-3xl font-bold text-primary tracking-wide">INVITVO</span>
          <span className="text-xs md:text-sm text-muted-foreground tracking-widest">PHARMACEUTICALS LTD.</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
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
            className="md:hidden bg-background border-t border-border mt-4 overflow-hidden relative"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Logo Watermark Background */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.08] pointer-events-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src ?? (logo as unknown as string)}
                alt=""
                className="w-48 h-auto"
              />
            </div>

            {/* Navigation Links */}
            <div className="container mx-auto px-4 py-6 flex flex-col gap-5 relative z-10">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Link
                    href={link.href}
                    className={`block text-lg ${isActive(link.href) ? "text-primary font-medium border-l-2 border-primary pl-3" : "text-nav hover:text-primary transition-colors pl-3"}`}
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
