import { Shield, Mail, MapPin, Calendar } from "lucide-react";
import { Link } from "wouter";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "AI Solutions", href: "/ai-solutions" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Schedule Consultation", href: "/schedule" },
];

export default function Footer() {
  return (
    <footer className="bg-[#060F1E] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/">
              <span className="flex items-center gap-3 mb-5 cursor-pointer">
                <img
                  src="/manus-storage/ccm_logo_fac4c845.png"
                  alt="Creative Cyber Management Logo"
                  className="h-12 w-12 object-contain"
                />
                <div>
                  <div className="text-white font-bold text-lg leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Creative Cyber Management
                  </div>
                  <div className="text-[#D4A843] text-xs tracking-widest uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    LLC
                  </div>
                </div>
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              Your Trusted Partner in Information Security and Technology Management.
              Protecting businesses through zero-trust principles and CISA best practices.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Shield size={14} className="text-[#D4A843]" />
                <span className="text-white/50 text-xs" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>CISA Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="grid grid-cols-2 gap-0.5 w-3.5 h-3.5">
                  <div className="bg-[#F25022] rounded-[1px]" />
                  <div className="bg-[#7FBA00] rounded-[1px]" />
                  <div className="bg-[#00A4EF] rounded-[1px]" />
                  <div className="bg-[#FFB900] rounded-[1px]" />
                </div>
                <span className="text-white/50 text-xs" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Microsoft Partner</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#D4A843] text-xs font-semibold tracking-widest uppercase mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>
                    <span className="text-white/60 hover:text-[#D4A843] text-sm transition-colors duration-200 cursor-pointer" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#D4A843] text-xs font-semibold tracking-widest uppercase mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={15} className="text-[#1E6FD9] mt-0.5 shrink-0" />
                <a
                  href="mailto:info@creativecybermanagement.com"
                  className="text-white/60 hover:text-white text-sm transition-colors"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  info@creativecybermanagement.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-[#1E6FD9] mt-0.5 shrink-0" />
                <span className="text-white/60 text-sm" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                  Atlanta, GA
                </span>
              </li>
              <li className="mt-4">
                <Link href="/schedule">
                  <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded text-sm font-bold cursor-pointer transition-all hover:brightness-110" style={{ backgroundColor: "#D4A843", color: "#0B1E3D", fontFamily: "'Space Grotesk', sans-serif" }}>
                    <Calendar size={14} /> Schedule Consultation
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            © {new Date().getFullYear()} Creative Cyber Management, LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-white/40 text-xs" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Privacy Policy</span>
            <span className="text-white/40 text-xs" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
