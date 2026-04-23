import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Shield, Clock, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { EFFECTIVE_DATE, LAST_UPDATED, COMPANY_NAME } from "@/data/legalContent";

interface LegalSection {
  heading: string;
  body: string;
}

interface LegalPageProps {
  title: string;
  subtitle: string;
  sections: LegalSection[];
  accentColor?: string;
}

function renderBody(text: string) {
  // Split on double newlines for paragraphs, handle **bold** inline
  return text.split("\n\n").map((para, i) => {
    const parts = para.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p key={i} className="text-gray-600 leading-relaxed mb-4 last:mb-0" style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "1rem" }}>
        {parts.map((part, j) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={j} className="text-[#0B1E3D] font-semibold">{part.slice(2, -2)}</strong>;
          }
          return <span key={j}>{part}</span>;
        })}
      </p>
    );
  });
}

export default function LegalPage({ title, subtitle, sections, accentColor = "#1E6FD9" }: LegalPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative py-28 overflow-hidden bg-gradient-to-br from-[#060F1E] via-[#0B1E3D] to-[#0D2347]">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, ${accentColor} 0%, transparent 50%), radial-gradient(circle at 80% 50%, #D4A843 0%, transparent 50%)`,
          }}
        />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-white/40 text-sm mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <Link href="/">
                <span className="hover:text-white/70 transition-colors cursor-pointer">Home</span>
              </Link>
              <ChevronRight size={14} />
              <span className="text-white/60">{title}</span>
            </div>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${accentColor}25` }}>
                <Shield size={20} style={{ color: accentColor }} />
              </div>
              <div className="px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase" style={{ backgroundColor: `${accentColor}20`, color: accentColor, fontFamily: "'Space Grotesk', sans-serif" }}>
                Legal
              </div>
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              {title}
            </h1>
            <p className="text-white/60 text-lg max-w-2xl leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              {subtitle}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-5 mt-8 pt-8 border-t border-white/10">
              <div className="flex items-center gap-2 text-white/40 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                <Clock size={14} />
                <span>Effective: {EFFECTIVE_DATE}</span>
              </div>
              <div className="flex items-center gap-2 text-white/40 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                <Clock size={14} />
                <span>Last Updated: {LAST_UPDATED}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Table of Contents — sticky sidebar */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-[#F8F9FC] rounded-2xl p-5 border border-gray-100">
                <h3 className="text-xs font-bold text-[#0B1E3D] uppercase tracking-widest mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Contents
                </h3>
                <nav className="space-y-1">
                  {sections.map((section, i) => (
                    <a
                      key={i}
                      href={`#section-${i}`}
                      className="block text-xs text-gray-500 hover:text-[#1E6FD9] py-1.5 leading-snug transition-colors border-l-2 border-transparent hover:border-[#1E6FD9] pl-3 -ml-0.5"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {section.heading}
                    </a>
                  ))}
                </nav>

                <div className="mt-6 pt-5 border-t border-gray-200">
                  <Link href="/">
                    <span className="flex items-center gap-2 text-xs text-gray-400 hover:text-[#1E6FD9] transition-colors cursor-pointer" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      <ArrowLeft size={12} />
                      Back to Home
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <div className="space-y-10">
              {sections.map((section, i) => (
                <motion.div
                  key={i}
                  id={`section-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="scroll-mt-28"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div
                      className="w-1 rounded-full shrink-0 mt-1"
                      style={{ backgroundColor: accentColor, height: "1.5rem" }}
                    />
                    <h2
                      className="text-xl font-bold text-[#0B1E3D] leading-snug"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {section.heading}
                    </h2>
                  </div>
                  <div className="pl-4">
                    {renderBody(section.body)}
                  </div>
                  {i < sections.length - 1 && (
                    <div className="mt-8 border-b border-gray-100" />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Footer note */}
            <div className="mt-14 p-6 bg-[#F8F9FC] rounded-2xl border border-gray-100">
              <div className="flex items-start gap-3">
                <Shield size={18} className="text-[#1E6FD9] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-[#0B1E3D] mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Questions about this document?
                  </p>
                  <p className="text-sm text-gray-500 leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                    If you have any questions or concerns about this {title}, please{" "}
                    <Link href="/contact">
                      <span className="text-[#1E6FD9] hover:underline cursor-pointer">contact us</span>
                    </Link>{" "}
                    or email us directly at{" "}
                    <a href="mailto:info@creativecybermanagement.com" className="text-[#1E6FD9] hover:underline">
                      info@creativecybermanagement.com
                    </a>
                    . We are committed to transparency and will respond within 2 business days.
                  </p>
                </div>
              </div>
            </div>

            {/* Other legal docs links */}
            <div className="mt-8">
              <h3 className="text-sm font-bold text-[#0B1E3D] mb-4 uppercase tracking-widest" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Other Legal Documents
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { label: "Terms & Conditions", href: "/terms" },
                  { label: "Privacy Policy", href: "/privacy" },
                  { label: "Cookie Policy", href: "/cookies" },
                  { label: "Disclaimer", href: "/disclaimer" },
                ]
                  .filter((doc) => !window.location.pathname.includes(doc.href.replace("/", "")))
                  .map((doc) => (
                    <Link key={doc.href} href={doc.href}>
                      <span
                        className="flex items-center justify-between px-4 py-3 rounded-xl border border-gray-200 hover:border-[#1E6FD9] hover:bg-[#1E6FD9]/5 transition-all cursor-pointer text-sm text-[#0B1E3D] font-medium group"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {doc.label}
                        <ChevronRight size={14} className="text-gray-300 group-hover:text-[#1E6FD9] transition-colors" />
                      </span>
                    </Link>
                  ))}
              </div>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
