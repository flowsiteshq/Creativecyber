/*
 * Navbar — Corporate Prestige Design
 * Deep navy background, gold accent on active/hover, Space Grotesk font
 * Sticky with blur backdrop on scroll
 */

import { useState, useEffect } from "react";
import { Menu, X, Shield } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "AI Solutions", href: "#ai-solutions" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0B1E3D]/95 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <img
              src="/manus-storage/ccm_logo_fac4c845.png"
              alt="Creative Cyber Management Logo"
              className="h-12 w-12 object-contain"
            />
            <div className="hidden sm:block">
              <div
                className="text-white font-display font-bold text-lg leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Creative Cyber
              </div>
              <div
                className="text-[#D4A843] font-label text-xs tracking-widest uppercase"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Management, LLC
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/80 hover:text-[#D4A843] transition-colors duration-200 text-sm font-medium tracking-wide"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="btn-gold px-5 py-2.5 rounded text-sm"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Free Consultation
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0B1E3D] border-t border-white/10">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block text-white/80 hover:text-[#D4A843] py-2 text-sm font-medium tracking-wide transition-colors"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="block btn-gold px-5 py-2.5 rounded text-sm text-center mt-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              onClick={() => setMobileOpen(false)}
            >
              Free Consultation
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
