import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Brain, CheckCircle, ArrowRight, Zap, Shield, BarChart3, Bot, Cloud, Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "wouter";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number,number,number,number] } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} className={className} variants={stagger} initial="hidden" animate={isInView ? "visible" : "hidden"}>
      {children}
    </motion.div>
  );
}

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

const aiServices = [
  {
    icon: Brain,
    title: "AI Strategy & Implementation",
    description: "We help you define and execute an AI roadmap that aligns with your business goals, security requirements, and compliance obligations. From use-case discovery to production deployment.",
    features: ["AI readiness assessment", "Use-case prioritization", "Pilot program design", "Full-scale deployment"],
  },
  {
    icon: Cloud,
    title: "Microsoft Azure AI & Copilot",
    description: "As a certified Microsoft Partner, we specialize in deploying Azure OpenAI, Microsoft Copilot, and the full Azure AI suite within your existing Microsoft 365 environment.",
    features: ["Azure OpenAI Service", "Microsoft Copilot for M365", "Azure Cognitive Services", "Power Platform AI Builder"],
  },
  {
    icon: Shield,
    title: "AI-Powered Threat Detection",
    description: "Leverage machine learning models to detect anomalies, identify threats in real time, and automate incident response — before attackers can cause damage.",
    features: ["Behavioral anomaly detection", "Automated threat response", "AI-driven SIEM integration", "Predictive risk scoring"],
  },
  {
    icon: CheckCircle,
    title: "Intelligent Compliance Automation",
    description: "AI-driven compliance monitoring that continuously scans your environment, flags violations, and generates audit-ready documentation — dramatically reducing manual effort.",
    features: ["Continuous compliance scanning", "Automated evidence collection", "AI-generated audit reports", "Policy violation alerts"],
  },
  {
    icon: BarChart3,
    title: "AI Governance Frameworks",
    description: "We help you establish responsible AI governance — policies, oversight mechanisms, and ethical guidelines that ensure your AI deployments remain secure, fair, and compliant.",
    features: ["AI policy development", "Model risk management", "Bias & fairness auditing", "Regulatory compliance mapping"],
  },
  {
    icon: Bot,
    title: "Intelligent Process Automation",
    description: "Automate repetitive security and compliance tasks using AI-powered workflows — from onboarding new employees to generating security reports and managing vendor assessments.",
    features: ["Security workflow automation", "AI-powered reporting", "Vendor assessment automation", "Employee onboarding security"],
  },
];

export default function AISolutions() {
  const [activeOption, setActiveOption] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActiveOption(prev => (prev + 1) % 3), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section
        className="relative py-32 overflow-hidden"
        style={{
          backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310419663031545745/V9WJ85ZSty5EE2RXNtA2Ej/ccm_ai_section-9YoZi76NpK5LQCLTcUzV2q.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#060F1E]/95 via-[#0B1E3D]/90 to-[#0B1E3D]/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <div className="inline-block px-4 py-1.5 rounded-full bg-[#D4A843]/20 border border-[#D4A843]/30 text-[#D4A843] text-xs font-semibold tracking-widest uppercase mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                AI-Powered Services
              </div>
              <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Intelligent Security
                <span className="block text-[#D4A843] italic">Meets Enterprise AI</span>
              </h1>

              {/* AI Option Tabs */}
              <div className="mb-8">
                <div className="flex gap-3 mb-5">
                  {aiOptions.map((opt, i) => (
                    <button
                      key={opt.label}
                      onClick={() => setActiveOption(i)}
                      className={`px-4 py-2 rounded text-xs font-semibold tracking-wide transition-all duration-300 ${
                        activeOption === i ? "bg-[#D4A843] text-[#0B1E3D]" : "bg-white/10 text-white/60 hover:bg-white/20"
                      }`}
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                <div className="min-h-[80px]">
                  <motion.p
                    key={activeOption}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-white/90 text-xl leading-relaxed italic border-l-4 border-[#D4A843] pl-5"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    "{aiOptions[activeOption].text}"
                  </motion.p>
                </div>
              </div>

              <Link href="/schedule">
                <span className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-[#D4A843] text-[#0B1E3D] font-bold hover:bg-[#c49a35] transition-colors cursor-pointer" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Explore AI Solutions <Brain size={18} />
                </span>
              </Link>
            </motion.div>

            {/* Microsoft Partner Badge */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="flex flex-col gap-6">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center">
                <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center mx-auto mb-5 shadow-lg">
                  <div className="grid grid-cols-2 gap-1 w-10 h-10">
                    <div className="bg-[#F25022] rounded-sm" />
                    <div className="bg-[#7FBA00] rounded-sm" />
                    <div className="bg-[#00A4EF] rounded-sm" />
                    <div className="bg-[#FFB900] rounded-sm" />
                  </div>
                </div>
                <h3 className="text-white font-bold text-xl mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Certified Microsoft Partner</h3>
                <p className="text-white/60 text-sm mb-5" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                  Delivering enterprise-grade AI and cloud security solutions with Microsoft's full ecosystem
                </p>
                <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-5">
                  {[["M365", "Hardening"], ["Azure", "AI & Cloud"], ["Copilot", "Integration"]].map(([val, lbl]) => (
                    <div key={val}>
                      <div className="text-[#D4A843] font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>{val}</div>
                      <div className="text-white/50 text-xs" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{lbl}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Zap size={20} className="text-[#D4A843]" />
                  <span className="text-white font-semibold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>AI-Ready Security</span>
                </div>
                <p className="text-white/60 text-sm" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                  We bridge the gap between cutting-edge AI capabilities and enterprise security requirements.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Services Grid */}
      <AnimatedSection className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#1E6FD9]/10 text-[#1E6FD9] text-xs font-semibold tracking-widest uppercase mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>What We Offer</div>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#0B1E3D]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Our AI Service Portfolio
              <div className="w-16 h-1 bg-[#D4A843] mx-auto mt-4" />
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed mt-6" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              From strategy to deployment, we deliver AI solutions that are secure, compliant, and built for the enterprise.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiServices.map(svc => (
              <motion.div key={svc.title} variants={fadeUp} className="bg-[#F8F9FC] rounded-2xl p-7 border border-gray-100 hover:shadow-lg transition-shadow group">
                <div className="w-12 h-12 rounded-xl bg-[#1E6FD9]/10 flex items-center justify-center mb-5 group-hover:bg-[#D4A843]/10 transition-colors">
                  <svc.icon size={24} className="text-[#1E6FD9] group-hover:text-[#D4A843] transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-[#0B1E3D] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{svc.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-5" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>{svc.description}</p>
                <div className="space-y-2">
                  {svc.features.map(f => (
                    <div key={f} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D4A843]" />
                      <span className="text-gray-500 text-xs" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{f}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Why AI Security Matters */}
      <AnimatedSection className="py-20 bg-gradient-to-br from-[#060F1E] via-[#0B1E3D] to-[#0D2347]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp}>
              <div className="inline-block px-4 py-1.5 rounded-full bg-[#D4A843]/20 border border-[#D4A843]/30 text-[#D4A843] text-xs font-semibold tracking-widest uppercase mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Why It Matters</div>
              <h2 className="text-4xl font-bold text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                AI Is Transforming Cybersecurity — <span className="text-[#D4A843] italic">Are You Ready?</span>
              </h2>
              <p className="text-white/70 leading-relaxed mb-6" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                Cyber attackers are already using AI to launch more sophisticated, faster, and harder-to-detect attacks. Organizations that don't adopt AI-powered defenses are falling behind.
              </p>
              <p className="text-white/70 leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                At Creative Cyber Management, we help you harness AI not just for defense, but for operational efficiency — automating compliance, streamlining security workflows, and giving your team AI-powered insights.
              </p>
            </motion.div>
            <motion.div variants={stagger} className="grid grid-cols-2 gap-5">
              {[
                { val: "300%", lbl: "Faster threat detection with AI" },
                { val: "60%", lbl: "Reduction in compliance effort" },
                { val: "85%", lbl: "Of attacks now use AI techniques" },
                { val: "24/7", lbl: "AI-powered monitoring coverage" },
              ].map(stat => (
                <motion.div key={stat.lbl} variants={fadeUp} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-[#D4A843] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{stat.val}</div>
                  <div className="text-white/60 text-xs leading-snug" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{stat.lbl}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Security Note */}
      <AnimatedSection className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={fadeUp} className="bg-[#F8F9FC] rounded-2xl p-10 border border-gray-100">
            <Lock size={40} className="text-[#1E6FD9] mx-auto mb-5" />
            <h3 className="text-2xl font-bold text-[#0B1E3D] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              AI Without Security Is a Risk, Not a Solution
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              Every AI deployment we build is designed with security and compliance at its core. We don't just implement AI — we implement it responsibly, with proper data governance, access controls, and audit trails.
            </p>
            <Link href="/schedule">
              <span className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-[#D4A843] text-[#0B1E3D] font-bold hover:bg-[#c49a35] transition-colors cursor-pointer" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Start Your AI Journey <ArrowRight size={18} />
              </span>
            </Link>
          </motion.div>
        </div>
      </AnimatedSection>

      <Footer />
    </div>
  );
}
