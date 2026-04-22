import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, CheckCircle, Network, ArrowRight, Lock, Eye, FileText, Users, Zap, AlertTriangle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "wouter";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number,number,number,number] } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

function AnimatedSection({ children, className = "", id = "" }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} id={id} className={className} variants={stagger} initial="hidden" animate={isInView ? "visible" : "hidden"}>
      {children}
    </motion.div>
  );
}

const services = [
  {
    icon: Shield,
    title: "Virtual Chief Security Officer (vCISO) Program",
    tagline: "Your dedicated security leadership — without the full-time cost.",
    description: "Our premier service transforms your organization's security posture from the ground up. We act as your embedded security leadership team, providing strategic guidance and hands-on implementation across every layer of your cybersecurity program.",
    features: [
      "Cyber security & data policy creation",
      "Vendor risk management",
      "Employee security education & awareness",
      "Microsoft 365 hardening & configuration",
      "Google Workspace management",
      "Cyber insurance security assessments",
      "Social engineering & phishing testing",
      "Endpoint security solutions",
    ],
    color: "#1E6FD9",
    bg: "bg-blue-50",
    badge: "Most Popular",
  },
  {
    icon: CheckCircle,
    title: "Statutory Compliance Management",
    tagline: "Stay compliant. Stay audit-ready. Always.",
    description: "Our Compliance as a Service Program simplifies and automates statutory compliance requirements. We monitor your systems in real time and create audit-ready reports that keep your organization up-to-date and in compliance — including HIPAA Compliance as a Service.",
    features: [
      "HIPAA Compliance as a Service",
      "Real-time compliance monitoring",
      "Automated audit-ready reports",
      "Policy documentation & management",
      "Risk assessment & gap analysis",
      "Regulatory change tracking",
      "Staff compliance training",
      "Incident response planning",
    ],
    color: "#D4A843",
    bg: "bg-amber-50",
    badge: "Healthcare Focused",
  },
  {
    icon: Network,
    title: "Network Security & Vulnerability Management",
    tagline: "Know your risks before attackers do.",
    description: "The old adage goes 'You don't know, what you don't know...' Our team of professionals takes a deep dive into your network and systems to create comprehensive, easy-to-understand reports of where your organization stands in terms of risks and vulnerabilities.",
    features: [
      "Network penetration testing",
      "Vulnerability scanning & assessment",
      "Risk prioritization reports",
      "Firewall & perimeter review",
      "Wireless security assessment",
      "Dark web monitoring",
      "Security architecture review",
      "Remediation roadmap",
    ],
    color: "#0B1E3D",
    bg: "bg-slate-50",
    badge: "Deep-Dive Analysis",
  },
];

const additionalServices = [
  { icon: Lock, title: "Zero-Trust Implementation", desc: "Deploy zero-trust architecture principles across your entire organization." },
  { icon: Eye, title: "24/7 Security Monitoring", desc: "Continuous monitoring of your systems, networks, and endpoints." },
  { icon: FileText, title: "Security Policy Development", desc: "Comprehensive security policies tailored to your industry and size." },
  { icon: Users, title: "Security Awareness Training", desc: "Empower your team to be your first line of defense against cyber threats." },
  { icon: Zap, title: "Incident Response", desc: "Rapid response planning and execution when security incidents occur." },
  { icon: AlertTriangle, title: "Cyber Insurance Support", desc: "Help you understand, qualify for, and maximize your cyber insurance coverage." },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-[#060F1E] via-[#0B1E3D] to-[#0D2347]">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #1E6FD9 0%, transparent 50%), radial-gradient(circle at 70% 50%, #D4A843 0%, transparent 50%)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#D4A843]/20 border border-[#D4A843]/30 text-[#D4A843] text-xs font-semibold tracking-widest uppercase mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Our Services
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Comprehensive Security
              <span className="block text-[#D4A843] italic">Solutions</span>
            </h1>
            <p className="text-white/70 text-xl max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              Tailored cybersecurity services for small and medium businesses, non-profits, cultural institutions, and healthcare professionals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Services */}
      <AnimatedSection className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#1E6FD9]/10 text-[#1E6FD9] text-xs font-semibold tracking-widest uppercase mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Core Offerings</div>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#0B1E3D]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Our Three Pillars
              <div className="w-16 h-1 bg-[#D4A843] mx-auto mt-4" />
            </h2>
          </motion.div>

          <div className="space-y-16">
            {services.map((svc, i) => (
              <motion.div key={svc.title} variants={fadeUp} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${svc.color}15` }}>
                      <svc.icon size={24} style={{ color: svc.color }} />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: `${svc.color}15`, color: svc.color, fontFamily: "'Space Grotesk', sans-serif" }}>
                      {svc.badge}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-[#0B1E3D] mb-2 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>{svc.title}</h3>
                  <p className="text-[#1E6FD9] font-semibold mb-4 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{svc.tagline}</p>
                  <p className="text-gray-600 leading-relaxed mb-6" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>{svc.description}</p>
                  <Link href="/schedule">
                    <span className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white text-sm font-semibold transition-all hover:opacity-90 cursor-pointer" style={{ backgroundColor: svc.color, fontFamily: "'Space Grotesk', sans-serif" }}>
                      Schedule Consultation <ArrowRight size={16} />
                    </span>
                  </Link>
                </div>
                <div className={`${svc.bg} rounded-2xl p-8 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <h4 className="text-sm font-bold text-[#0B1E3D] mb-5 tracking-wide uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>What's Included</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {svc.features.map(f => (
                      <div key={f} className="flex items-start gap-2.5">
                        <CheckCircle size={16} className="mt-0.5 shrink-0" style={{ color: svc.color }} />
                        <span className="text-gray-700 text-sm leading-snug" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Additional Services */}
      <AnimatedSection className="py-24 bg-[#F8F9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="text-center mb-14">
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#1E6FD9]/10 text-[#1E6FD9] text-xs font-semibold tracking-widest uppercase mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Additional Capabilities</div>
            <h2 className="text-4xl font-bold text-[#0B1E3D]" style={{ fontFamily: "'Playfair Display', serif" }}>
              More Ways We Protect You
              <div className="w-16 h-1 bg-[#D4A843] mx-auto mt-4" />
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalServices.map(svc => (
              <motion.div key={svc.title} variants={fadeUp} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-[#1E6FD9]/10 flex items-center justify-center mb-4">
                  <svc.icon size={20} className="text-[#1E6FD9]" />
                </div>
                <h3 className="font-bold text-[#0B1E3D] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{svc.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>{svc.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* CTA */}
      <section className="py-20 bg-[#0B1E3D]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Ready to Secure Your Organization?
          </h2>
          <p className="text-white/70 text-lg mb-8" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
            Schedule a free consultation and let's talk about what your organization needs — no techno-babble, just straight answers.
          </p>
          <Link href="/schedule">
            <span className="inline-flex items-center gap-2 px-10 py-4 rounded-lg bg-[#D4A843] text-[#0B1E3D] font-bold text-base hover:bg-[#c49a35] transition-colors cursor-pointer" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Schedule Free Consultation <ArrowRight size={18} />
            </span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
