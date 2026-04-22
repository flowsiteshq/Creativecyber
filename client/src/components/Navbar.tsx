import { useState, useEffect } from "react";
import { Menu, X, Calendar } from "lucide-react";
import { Link, useLocation } from "wouter";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "AI Solutions", href: "/ai-solutions" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // On non-home pages, always show solid background
  const isHome = location === "/";
  const solidBg = !isHome || isScrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solidBg
          ? "bg-[#0B1E3D]/97 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/">
            <span className="flex items-center gap-3 group cursor-pointer">
              <img
                src="/manus-storage/ccm_logo_fac4c845.png"
                alt="Creative Cyber Management Logo"
                className="h-12 w-12 object-contain"
              />
              <div className="hidden sm:block">
                <div className="text-white font-bold text-lg leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Creative Cyber
                </div>
                <div className="text-[#D4A843] text-xs tracking-widest uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Management, LLC
                </div>
              </div>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = location === link.href;
              return (
                <Link key={link.label} href={link.href}>
                  <span
                    className={`text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer ${
                      isActive ? "text-[#D4A843]" : "text-white/80 hover:text-[#D4A843]"
                    }`}
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {link.label}
                  </span>
                </Link>
              );
            })}
            <Link href="/schedule">
              <span
                className="flex items-center gap-2 px-5 py-2.5 rounded text-sm font-bold cursor-pointer transition-all hover:brightness-110"
                style={{ backgroundColor: "#D4A843", color: "#0B1E3D", fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <Calendar size={14} /> Free Consultation
              </span>
            </Link>
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
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => {
              const isActive = location === link.href;
              return (
                <Link key={link.label} href={link.href}>
                  <span
                    className={`block py-3 px-2 text-sm font-medium tracking-wide transition-colors rounded-lg cursor-pointer ${
                      isActive ? "text-[#D4A843] bg-white/5" : "text-white/80 hover:text-[#D4A843] hover:bg-white/5"
                    }`}
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </span>
                </Link>
              );
            })}
            <Link href="/schedule">
              <span
                className="block text-center py-3 px-5 rounded text-sm font-bold mt-3 cursor-pointer"
                style={{ backgroundColor: "#D4A843", color: "#0B1E3D", fontFamily: "'Space Grotesk', sans-serif" }}
                onClick={() => setMobileOpen(false)}
              >
                Schedule Free Consultation
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
