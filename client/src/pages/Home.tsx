/*
 * Home Page — Creative Cyber Management
 * Corporate Prestige Design System
 * Sections: Hero, Services, AI Solutions, About, Testimonials, Partners, CTA, Contact
 */

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Shield,
  Lock,
  Network,
  Brain,
  CheckCircle,
  ArrowRight,
  Quote,
  ChevronDown,
  Mail,
  Phone,
  Calendar,
  Star,
  Award,
  Users,
  Zap,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── Animation Variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};
void fadeIn; // suppress unused warning

// ─── Section Wrapper with Scroll Trigger ─────────────────────────────────────
function AnimatedSection({
  children,
  className = "",
  id = "",
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      id={id}
      className={className}
      variants={stagger}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

// ─── Service Card ─────────────────────────────────────────────────────────────
function ServiceCard({
  icon: Icon,
  title,
  description,
  link,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  link: string;
}) {
  return (
    <motion.div variants={fadeUp} className="service-card group">
      <div className="w-12 h-12 rounded-lg bg-[#1E6FD9]/10 flex items-center justify-center mb-5 group-hover:bg-[#D4A843]/10 transition-colors duration-300">
        <Icon size={24} className="text-[#1E6FD9] group-hover:text-[#D4A843] transition-colors duration-300" />
      </div>
      <h3
        className="text-xl font-bold text-[#0B1E3D] mb-3 leading-snug"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {title}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-5" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
        {description}
      </p>
      <a
        href="#contact"
        className="inline-flex items-center gap-2 text-[#1E6FD9] text-sm font-semibold hover:text-[#D4A843] transition-colors duration-200 group-hover:gap-3"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        Schedule Appointment <ArrowRight size={15} />
      </a>
    </motion.div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <motion.div variants={fadeUp} className="text-center">
      <div
        className="text-4xl font-bold text-[#D4A843] mb-2"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {value}
      </div>
      <div className="text-white/70 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        {label}
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Home() {
  const [activeAiOption, setActiveAiOption] = useState(0);

  const aiOptions = [
    {
      label: "Option 1",
      text: "Empowering businesses with intelligent, secure AI solutions—built on the strength of a trusted Microsoft partner.",
    },
    {
      label: "Option 2",
      text: "Transforming ideas into enterprise‑ready AI, backed by the reliability of a certified Microsoft partner.",
    },
    {
      label: "Option 3",
      text: "Where innovation meets trust: AI development powered by deep Microsoft partnership.",
    },
  ];

  // Auto-rotate AI options
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveAiOption((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════════════════════ */}
      <section
        id="home"
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{
          backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310419663031545745/V9WJ85ZSty5EE2RXNtA2Ej/ccm_hero_bg-EdXBumDk7osJBZ4kBeiZKY.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#060F1E]/90 via-[#0B1E3D]/80 to-[#0B1E3D]/50" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="section-label mb-6"
            >
              Trusted Cybersecurity Partner
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Creative Cyber
              <span className="block text-[#D4A843]">Management</span>
              <span className="block text-3xl sm:text-4xl lg:text-5xl font-normal italic text-white/80 mt-2">
                LLC
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-xl text-white/80 leading-relaxed mb-8 max-w-xl"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Your Trusted Partner in Information Security and Technology Management.
              Zero-trust principles. Real-world results.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#contact"
                className="btn-gold px-8 py-4 rounded text-base inline-flex items-center gap-2"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Schedule A Free Consultation
                <ArrowRight size={18} />
              </a>
              <a
                href="#services"
                className="btn-outline-white px-8 py-4 rounded text-base inline-flex items-center gap-2"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Our Services
              </a>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-12 flex flex-wrap gap-6"
            >
              {[
                { icon: Shield, text: "CISA Best Practices" },
                { icon: Lock, text: "Zero-Trust Security" },
                { icon: Award, text: "Microsoft Partner" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2">
                  <Icon size={16} className="text-[#D4A843]" />
                  <span className="text-white/60 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {text}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-widest" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            SCROLL
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          STATS BAND
      ═══════════════════════════════════════════════════════════════════════ */}
      <AnimatedSection className="bg-gradient-to-r from-[#060F1E] via-[#0B1E3D] to-[#0D2347] py-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #1E6FD9 0%, transparent 50%), radial-gradient(circle at 80% 50%, #D4A843 0%, transparent 50%)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard value="15+" label="Years of Experience" />
            <StatCard value="200+" label="Clients Protected" />
            <StatCard value="100%" label="Zero-Trust Compliance" />
            <StatCard value="24/7" label="Security Monitoring" />
          </div>
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════════════════════════════════════
          SERVICES SECTION
      ═══════════════════════════════════════════════════════════════════════ */}
      <AnimatedSection id="services" className="py-24 bg-white relative">
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%230B1E3D\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="text-center mb-16">
            <div className="section-label mb-4 text-center">
              What We Do
            </div>
            <h2
              className="text-4xl sm:text-5xl font-bold text-[#0B1E3D] mb-5"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Service Solutions
              <div className="w-16 h-1 bg-[#D4A843] mx-auto mt-4" />
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed mt-8" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              Comprehensive cybersecurity and compliance services tailored for small and medium businesses,
              non-profits, cultural institutions, and healthcare professionals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard
              icon={Shield}
              title="Virtual Chief Security Officer Program"
              description="Our premier service helps your organization go from zero to hero with cyber security and data policy creation, vendor management, employee education and compliance, MS365 hardening, Google Workplace Management, cyber insurance security assessments, social engineering testing and end-point security solutions."
              link="#contact"
            />
            <ServiceCard
              icon={CheckCircle}
              title="Statutory Compliance Management"
              description="Our Compliance as a Service Program simplifies and automates statutory compliance requirements. We monitor your systems in real time and create audit-ready reports that keep your organization up-to-date and in compliance — including HIPAA Compliance as a Service."
              link="#contact"
            />
            <ServiceCard
              icon={Network}
              title="Network Security & Vulnerability Management"
              description="The old adage goes 'You don't know, what you don't know...' Our team of professionals takes a deep dive into your network and systems to create comprehensive, easy-to-understand reports of where your organization stands in terms of risks and vulnerabilities."
              link="#contact"
            />
          </div>
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════════════════════════════════════
          AI SOLUTIONS SECTION
      ═══════════════════════════════════════════════════════════════════════ */}
      <section
        id="ai-solutions"
        className="relative py-28 overflow-hidden"
        style={{
          backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310419663031545745/V9WJ85ZSty5EE2RXNtA2Ej/ccm_ai_section-9YoZi76NpK5LQCLTcUzV2q.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#060F1E]/95 via-[#0B1E3D]/90 to-[#0B1E3D]/80" />

        <AnimatedSection className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Content */}
            <div>
              <motion.div variants={fadeUp} className="section-label mb-5">
                AI-Powered Services
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Intelligent Security
                <span className="block text-[#D4A843] italic">Meets Enterprise AI</span>
              </motion.h2>

              {/* AI Option Tabs */}
              <motion.div variants={fadeUp} className="mb-8">
                <div className="flex gap-3 mb-6">
                  {aiOptions.map((opt, i) => (
                    <button
                      key={opt.label}
                      onClick={() => setActiveAiOption(i)}
                      className={`px-4 py-2 rounded text-xs font-semibold tracking-wide transition-all duration-300 ${
                        activeAiOption === i
                          ? "bg-[#D4A843] text-[#0B1E3D]"
                          : "bg-white/10 text-white/60 hover:bg-white/20"
                      }`}
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                <div className="min-h-[80px]">
                  <motion.p
                    key={activeAiOption}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-white/90 text-xl leading-relaxed italic border-l-4 border-[#D4A843] pl-5"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    "{aiOptions[activeAiOption].text}"
                  </motion.p>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="space-y-4">
                {[
                  "Enterprise-grade AI implementation and strategy",
                  "Microsoft Azure AI & Copilot integration",
                  "AI-powered threat detection and response",
                  "Intelligent compliance automation",
                  "Secure AI governance frameworks",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-[#D4A843] shrink-0" />
                    <span className="text-white/80 text-sm" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                      {item}
                    </span>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={fadeUp} className="mt-8">
                <a
                  href="#contact"
                  className="btn-gold px-8 py-4 rounded text-base inline-flex items-center gap-2"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Explore AI Solutions
                  <Brain size={18} />
                </a>
              </motion.div>
            </div>

            {/* Right: Microsoft Partner Badge */}
            <motion.div variants={fadeUp} className="flex flex-col items-center lg:items-end gap-6">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center max-w-sm w-full">
                <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center mx-auto mb-5 shadow-lg">
                  {/* Microsoft Windows logo colors */}
                  <div className="grid grid-cols-2 gap-1 w-10 h-10">
                    <div className="bg-[#F25022] rounded-sm" />
                    <div className="bg-[#7FBA00] rounded-sm" />
                    <div className="bg-[#00A4EF] rounded-sm" />
                    <div className="bg-[#FFB900] rounded-sm" />
                  </div>
                </div>
                <h3
                  className="text-white font-bold text-xl mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Microsoft Partner
                </h3>
                <p className="text-white/60 text-sm" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                  Certified Microsoft Partner delivering enterprise-grade AI and cloud security solutions
                </p>
                <div className="mt-5 pt-5 border-t border-white/10 grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-[#D4A843] font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>M365</div>
                    <div className="text-white/50 text-xs" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Hardening</div>
                  </div>
                  <div>
                    <div className="text-[#D4A843] font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>Azure</div>
                    <div className="text-white/50 text-xs" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>AI & Cloud</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 max-w-sm w-full">
                <div className="flex items-center gap-3 mb-3">
                  <Zap size={20} className="text-[#D4A843]" />
                  <span className="text-white font-semibold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    AI-Ready Security
                  </span>
                </div>
                <p className="text-white/60 text-sm" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                  We bridge the gap between cutting-edge AI capabilities and enterprise security requirements.
                </p>
              </div>
            </motion.div>
          </div>
        </AnimatedSection>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          ABOUT SECTION
      ═══════════════════════════════════════════════════════════════════════ */}
      <AnimatedSection id="about" className="py-24 bg-[#F8F9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Image */}
            <motion.div variants={fadeUp} className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310419663031545745/V9WJ85ZSty5EE2RXNtA2Ej/ccm_about_img-nZhEScYbmBg49bhUNxcjQQ.webp"
                  alt="Creative Cyber Management Team"
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E3D]/40 to-transparent" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-6 bg-[#0B1E3D] text-white rounded-xl p-5 shadow-xl max-w-[200px]">
                <div className="text-[#D4A843] font-bold text-2xl mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Since 2010
                </div>
                <div className="text-white/70 text-xs" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Protecting businesses with zero-trust principles
                </div>
              </div>
            </motion.div>

            {/* Right: Content */}
            <div>
              <motion.div variants={fadeUp} className="section-label mb-4">
                About Us
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="text-4xl sm:text-5xl font-bold text-[#0B1E3D] mb-6 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Founded by Business Owners,
                <span className="block text-[#1E6FD9]">For Business Owners</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-gray-600 leading-relaxed mb-5" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                Our firm was founded by small business owners committed to helping other business owners,
                non-profit organizations and cultural institutions tackle the challenges of cyber crime.
                Our story starts in 1999 — and the lessons we learned from real cyber attacks became the
                foundation of our consulting practice in 2010.
              </motion.p>
              <motion.p variants={fadeUp} className="text-gray-600 leading-relaxed mb-8" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                We are totally committed to protecting our clients' privacy, financial assets, intellectual
                property and reputation. We employ "zero-trust" cyber security principles to ensure that
                your organization meets "best practices" criteria as defined by{" "}
                <a href="https://www.cisa.gov/cybersecurity" target="_blank" rel="noopener noreferrer" className="text-[#1E6FD9] hover:underline">
                  CISA (U.S. Cybersecurity and Infrastructure Agency)
                </a>.
              </motion.p>

              {/* Mission & Values */}
              <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                <motion.div variants={fadeUp} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield size={18} className="text-[#1E6FD9]" />
                    <span className="font-semibold text-[#0B1E3D] text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      Our Mission
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                    To protect our clients' financial, intellectual and reputational assets through a clear,
                    common sense application of zero-trust principles.
                  </p>
                </motion.div>
                <motion.div variants={fadeUp} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Star size={18} className="text-[#D4A843]" />
                    <span className="font-semibold text-[#0B1E3D] text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      Our Values
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                    We strive to go above and beyond for our clients no matter the challenge. We aim to
                    deliver our very best work every single day across our services.
                  </p>
                </motion.div>
              </motion.div>

              <motion.a
                variants={fadeUp}
                href="#contact"
                className="btn-gold px-8 py-4 rounded text-base inline-flex items-center gap-2"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Let's Have Coffee & Talk
                <ArrowRight size={18} />
              </motion.a>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════════════════════════════════════
          FOUNDER QUOTES
      ═══════════════════════════════════════════════════════════════════════ */}
      <AnimatedSection className="py-20 bg-[#0B1E3D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              {
                quote:
                  "For most people in the cybersecurity industry, they never started out seeking this profession as their original vocation, but rather fell into it out of a need to fight 'the bad guys.'",
                author: "Burton Maben",
                title: "Founder, Creative Cyber Management",
              },
              {
                quote:
                  "We don't try to dazzle you with techno-babble... we speak your language: the language of concerned business leaders wanting to protect their organizations from cyber thugs.",
                author: "Burton Maben",
                title: "Founder, Creative Cyber Management",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 relative"
              >
                <Quote size={40} className="text-[#D4A843]/30 absolute top-6 right-6" />
                <p
                  className="text-white/85 text-lg leading-relaxed italic mb-6"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  "{item.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1E6FD9]/30 flex items-center justify-center">
                    <Users size={18} className="text-[#1E6FD9]" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {item.author}
                    </div>
                    <div className="text-white/50 text-xs" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {item.title}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════════════════════════════════════
          TESTIMONIAL SECTION
      ═══════════════════════════════════════════════════════════════════════ */}
      <AnimatedSection className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="text-center mb-14">
            <div className="section-label mb-4">Client Testimonials</div>
            <h2
              className="text-4xl sm:text-5xl font-bold text-[#0B1E3D]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              What Our Clients Say
              <div className="w-16 h-1 bg-[#D4A843] mx-auto mt-4" />
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              variants={fadeUp}
              className="bg-[#F8F9FC] rounded-2xl p-8 border border-gray-100 relative"
            >
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-[#D4A843] fill-[#D4A843]" />
                ))}
              </div>
              <Quote size={32} className="text-[#1E6FD9]/20 mb-4" />
              <p
                className="text-gray-700 text-lg leading-relaxed italic mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                "The team at Creative Cyber Management automated our HIPAA compliance management and
                saved our practice hundreds of dollars a year."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#0B1E3D] flex items-center justify-center text-white font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                  S
                </div>
                <div>
                  <div className="font-semibold text-[#0B1E3D]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Samuel B. Milton, M.D.
                  </div>
                  <div className="text-gray-400 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Atlanta, GA
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="bg-[#F8F9FC] rounded-2xl p-8 border border-gray-100 relative"
            >
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-[#D4A843] fill-[#D4A843]" />
                ))}
              </div>
              <Quote size={32} className="text-[#1E6FD9]/20 mb-4" />
              <p
                className="text-gray-700 text-lg leading-relaxed italic mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                "Creative Cyber Management has an amazing team of hard working professionals.
                It has been a pleasure to work with them."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#1E6FD9] flex items-center justify-center text-white font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                  E
                </div>
                <div>
                  <div className="font-semibold text-[#0B1E3D]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Emily Davis
                  </div>
                  <div className="text-gray-400 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Satisfied Client
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════════════════════════════════════
          PARTNERS SECTION
      ═══════════════════════════════════════════════════════════════════════ */}
      <AnimatedSection className="py-16 bg-[#F8F9FC] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="text-center mb-10">
            <div className="section-label">Our Partners</div>
          </motion.div>
          <motion.div variants={stagger} className="flex flex-wrap justify-center items-center gap-12">
            {/* Microsoft */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col items-center gap-3 group"
            >
              <div className="w-16 h-16 bg-white rounded-xl shadow-md flex items-center justify-center group-hover:shadow-lg transition-shadow">
                <div className="grid grid-cols-2 gap-1 w-9 h-9">
                  <div className="bg-[#F25022] rounded-sm" />
                  <div className="bg-[#7FBA00] rounded-sm" />
                  <div className="bg-[#00A4EF] rounded-sm" />
                  <div className="bg-[#FFB900] rounded-sm" />
                </div>
              </div>
              <span className="text-gray-400 text-sm font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Microsoft
              </span>
            </motion.div>
            {/* CISA */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col items-center gap-3 group"
            >
              <div className="w-16 h-16 bg-white rounded-xl shadow-md flex items-center justify-center group-hover:shadow-lg transition-shadow">
                <Shield size={32} className="text-[#0B1E3D]" />
              </div>
              <span className="text-gray-400 text-sm font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                CISA
              </span>
            </motion.div>
            {/* Google Workspace */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col items-center gap-3 group"
            >
              <div className="w-16 h-16 bg-white rounded-xl shadow-md flex items-center justify-center group-hover:shadow-lg transition-shadow">
                <div className="grid grid-cols-2 gap-0.5 w-9 h-9">
                  <div className="bg-[#4285F4] rounded-sm" />
                  <div className="bg-[#EA4335] rounded-sm" />
                  <div className="bg-[#FBBC05] rounded-sm" />
                  <div className="bg-[#34A853] rounded-sm" />
                </div>
              </div>
              <span className="text-gray-400 text-sm font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Google Workspace
              </span>
            </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════════════════════════════════════
          CTA SECTION
      ═══════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative py-28 overflow-hidden"
        style={{
          backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310419663031545745/V9WJ85ZSty5EE2RXNtA2Ej/ccm_services_bg-gthCWeu5h8f4sRSzn3kS5f.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[#0B1E3D]/88" />
        <AnimatedSection className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={fadeUp} className="section-label mb-5">
            Get Started Today
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            No "Techno-Babble" . . .
            <span className="block text-[#D4A843] italic">Just Straight Answers.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-white/70 text-xl mb-10 leading-relaxed"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Let's have coffee and talk. Schedule your free consultation today and discover how we can
            protect your organization from cyber threats.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
            <a
              href="#contact"
              className="btn-gold px-10 py-4 rounded text-base inline-flex items-center gap-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Schedule A Free Consultation
              <Calendar size={18} />
            </a>
          </motion.div>
        </AnimatedSection>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          CONTACT SECTION
      ═══════════════════════════════════════════════════════════════════════ */}
      <AnimatedSection id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: Info */}
            <div>
              <motion.div variants={fadeUp} className="section-label mb-4">
                Contact Us
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="text-4xl sm:text-5xl font-bold text-[#0B1E3D] mb-6 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Let's Protect Your
                <span className="block text-[#1E6FD9]">Business Together</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-gray-500 leading-relaxed mb-8" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                Reach out to schedule your free consultation. We speak your language — no techno-babble,
                just clear, actionable cybersecurity guidance tailored to your organization.
              </motion.p>

              <motion.div variants={stagger} className="space-y-5">
                <motion.div variants={fadeUp} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0B1E3D]/5 flex items-center justify-center">
                    <Mail size={20} className="text-[#1E6FD9]" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Email</div>
                    <a href="mailto:info@creativecybermanagement.com" className="text-[#0B1E3D] font-medium hover:text-[#1E6FD9] transition-colors" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                      info@creativecybermanagement.com
                    </a>
                  </div>
                </motion.div>
                <motion.div variants={fadeUp} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0B1E3D]/5 flex items-center justify-center">
                    <Calendar size={20} className="text-[#1E6FD9]" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Appointments</div>
                    <span className="text-[#0B1E3D] font-medium" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                      By Appointment Only
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Right: Contact Form */}
            <motion.div variants={fadeUp}>
              <div className="bg-[#F8F9FC] rounded-2xl p-8 border border-gray-100">
                <h3
                  className="text-2xl font-bold text-[#0B1E3D] mb-6"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Schedule Your Free Consultation
                </h3>
                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5 tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        First Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-[#0B1E3D] text-sm focus:outline-none focus:ring-2 focus:ring-[#1E6FD9]/30 focus:border-[#1E6FD9] transition-all"
                        placeholder="John"
                        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5 tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-[#0B1E3D] text-sm focus:outline-none focus:ring-2 focus:ring-[#1E6FD9]/30 focus:border-[#1E6FD9] transition-all"
                        placeholder="Smith"
                        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-[#0B1E3D] text-sm focus:outline-none focus:ring-2 focus:ring-[#1E6FD9]/30 focus:border-[#1E6FD9] transition-all"
                      placeholder="john@company.com"
                      style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      Organization
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-[#0B1E3D] text-sm focus:outline-none focus:ring-2 focus:ring-[#1E6FD9]/30 focus:border-[#1E6FD9] transition-all"
                      placeholder="Your Company Name"
                      style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      How Can We Help?
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-[#0B1E3D] text-sm focus:outline-none focus:ring-2 focus:ring-[#1E6FD9]/30 focus:border-[#1E6FD9] transition-all resize-none"
                      placeholder="Tell us about your cybersecurity needs..."
                      style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full btn-gold py-4 rounded-lg text-base font-semibold flex items-center justify-center gap-2"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Send Message
                    <ArrowRight size={18} />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      <Footer />
    </div>
  );
}
