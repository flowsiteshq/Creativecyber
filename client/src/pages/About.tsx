import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Star, Users, Award, CheckCircle, ArrowRight, Quote } from "lucide-react";
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

const values = [
  { icon: Shield, title: "Integrity First", desc: "We operate with complete transparency. No hidden fees, no techno-babble — just honest guidance you can trust." },
  { icon: Star, title: "Excellence Always", desc: "We strive to go above and beyond for our clients no matter the challenge, delivering our very best work every single day." },
  { icon: Users, title: "Client-Centered", desc: "Founded by business owners, for business owners. We understand your challenges because we've faced them ourselves." },
  { icon: Award, title: "Certified Expertise", desc: "CISA Best Practices Certified and Microsoft Partner — our credentials back up every recommendation we make." },
];

const milestones = [
  { year: "1999", event: "Founder Burton Maben experiences a real cyber attack firsthand — the event that would shape everything." },
  { year: "2010", event: "Creative Cyber Management, LLC is founded in Atlanta, GA, bringing real-world cyber experience to small businesses." },
  { year: "2015", event: "Achieved CISA Best Practices Certification, formalizing our commitment to the highest security standards." },
  { year: "2018", event: "Became a certified Microsoft Partner, expanding our capabilities to include M365 hardening and Azure cloud security." },
  { year: "2022", event: "Launched our AI Solutions practice, helping clients harness Microsoft Azure AI and Copilot securely." },
  { year: "2024", event: "Protecting 200+ organizations across healthcare, non-profit, cultural institutions, and small businesses." },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-[#060F1E] via-[#0B1E3D] to-[#0D2347]">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #1E6FD9 0%, transparent 50%), radial-gradient(circle at 70% 50%, #D4A843 0%, transparent 50%)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#D4A843]/20 border border-[#D4A843]/30 text-[#D4A843] text-xs font-semibold tracking-widest uppercase mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              About Us
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Founded by Business Owners,
              <span className="block text-[#D4A843] italic">For Business Owners</span>
            </h1>
            <p className="text-white/70 text-xl max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              Our story starts in 1999 with a real cyber attack. The lessons we learned became the foundation of a consulting practice dedicated to protecting organizations like yours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <AnimatedSection className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp} className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310419663031545745/V9WJ85ZSty5EE2RXNtA2Ej/ccm_about_img-nZhEScYbmBg49bhUNxcjQQ.webp"
                  alt="Creative Cyber Management Team"
                  className="w-full h-[480px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E3D]/40 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-[#0B1E3D] text-white rounded-xl p-5 shadow-xl max-w-[200px]">
                <div className="text-[#D4A843] font-bold text-2xl mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Since 2010</div>
                <div className="text-white/70 text-xs" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Protecting businesses with zero-trust principles</div>
              </div>
            </motion.div>

            <div>
              <motion.div variants={fadeUp} className="inline-block px-4 py-1.5 rounded-full bg-[#1E6FD9]/10 text-[#1E6FD9] text-xs font-semibold tracking-widest uppercase mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Our Story</motion.div>
              <motion.h2 variants={fadeUp} className="text-4xl font-bold text-[#0B1E3D] mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Born From Real-World Experience
              </motion.h2>
              <motion.p variants={fadeUp} className="text-gray-600 leading-relaxed mb-5" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                Our firm was founded by small business owners committed to helping other business owners, non-profit organizations and cultural institutions tackle the challenges of cyber crime. Our story starts in 1999 — and the lessons we learned from real cyber attacks became the foundation of our consulting practice in 2010.
              </motion.p>
              <motion.p variants={fadeUp} className="text-gray-600 leading-relaxed mb-5" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                We are totally committed to protecting our clients' privacy, financial assets, intellectual property and reputation. We employ "zero-trust" cyber security principles to ensure that your organization meets "best practices" criteria as defined by{" "}
                <a href="https://www.cisa.gov/cybersecurity" target="_blank" rel="noopener noreferrer" className="text-[#1E6FD9] hover:underline">
                  CISA (U.S. Cybersecurity and Infrastructure Agency)
                </a>.
              </motion.p>
              <motion.p variants={fadeUp} className="text-gray-600 leading-relaxed mb-8" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                For most people in the cybersecurity industry, they never started out seeking this profession as their original vocation, but rather fell into it out of a need to fight "the bad guys." That's our story too — and it's why we're so passionate about what we do.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0B1E3D]/5">
                  <CheckCircle size={16} className="text-[#1E6FD9]" />
                  <span className="text-sm font-semibold text-[#0B1E3D]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>CISA Certified</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0B1E3D]/5">
                  <CheckCircle size={16} className="text-[#1E6FD9]" />
                  <span className="text-sm font-semibold text-[#0B1E3D]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Microsoft Partner</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0B1E3D]/5">
                  <CheckCircle size={16} className="text-[#1E6FD9]" />
                  <span className="text-sm font-semibold text-[#0B1E3D]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>15+ Years Experience</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Founder Quotes */}
      <AnimatedSection className="py-20 bg-[#0B1E3D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="text-center mb-12">
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#D4A843]/20 border border-[#D4A843]/30 text-[#D4A843] text-xs font-semibold tracking-widest uppercase mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>From Our Founder</div>
            <h2 className="text-4xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Burton Maben</h2>
            <p className="text-white/50 text-sm mt-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Founder, Creative Cyber Management, LLC</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              "For most people in the cybersecurity industry, they never started out seeking this profession as their original vocation, but rather fell into it out of a need to fight 'the bad guys.'",
              "We don't try to dazzle you with techno-babble... we speak your language: the language of concerned business leaders wanting to protect their organizations from cyber thugs.",
            ].map((quote, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-white/5 border border-white/10 rounded-2xl p-8 relative">
                <Quote size={40} className="text-[#D4A843]/30 absolute top-6 right-6" />
                <p className="text-white/85 text-lg leading-relaxed italic mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>"{quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1E6FD9]/30 flex items-center justify-center">
                    <Users size={18} className="text-[#1E6FD9]" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Burton Maben</div>
                    <div className="text-white/50 text-xs" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Founder, Creative Cyber Management</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Our Values */}
      <AnimatedSection className="py-24 bg-[#F8F9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="text-center mb-14">
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#1E6FD9]/10 text-[#1E6FD9] text-xs font-semibold tracking-widest uppercase mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>What We Stand For</div>
            <h2 className="text-4xl font-bold text-[#0B1E3D]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Our Core Values
              <div className="w-16 h-1 bg-[#D4A843] mx-auto mt-4" />
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(val => (
              <motion.div key={val.title} variants={fadeUp} className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm text-center hover:shadow-md transition-shadow">
                <div className="w-14 h-14 rounded-xl bg-[#1E6FD9]/10 flex items-center justify-center mx-auto mb-5">
                  <val.icon size={26} className="text-[#1E6FD9]" />
                </div>
                <h3 className="font-bold text-[#0B1E3D] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{val.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Timeline */}
      <AnimatedSection className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="text-center mb-14">
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#1E6FD9]/10 text-[#1E6FD9] text-xs font-semibold tracking-widest uppercase mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Our Journey</div>
            <h2 className="text-4xl font-bold text-[#0B1E3D]" style={{ fontFamily: "'Playfair Display', serif" }}>
              A History of Protection
              <div className="w-16 h-1 bg-[#D4A843] mx-auto mt-4" />
            </h2>
          </motion.div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#1E6FD9] to-[#D4A843]" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <motion.div key={m.year} variants={fadeUp} className="flex gap-8 items-start pl-16 relative">
                  <div className="absolute left-0 w-12 h-12 rounded-full bg-[#0B1E3D] border-4 border-white shadow-lg flex items-center justify-center">
                    <span className="text-[#D4A843] text-xs font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{m.year.slice(2)}</span>
                  </div>
                  <div className="bg-[#F8F9FC] rounded-xl p-5 flex-1 border border-gray-100">
                    <div className="text-[#1E6FD9] font-bold text-sm mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{m.year}</div>
                    <p className="text-gray-700 text-sm leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>{m.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Partners */}
      <AnimatedSection className="py-16 bg-[#F8F9FC] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="text-center mb-10">
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#1E6FD9]/10 text-[#1E6FD9] text-xs font-semibold tracking-widest uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Our Partners</div>
          </motion.div>
          <motion.div variants={stagger} className="flex flex-wrap justify-center items-center gap-12">
            {[
              { name: "Microsoft", logo: <div className="grid grid-cols-2 gap-1 w-9 h-9"><div className="bg-[#F25022] rounded-sm" /><div className="bg-[#7FBA00] rounded-sm" /><div className="bg-[#00A4EF] rounded-sm" /><div className="bg-[#FFB900] rounded-sm" /></div> },
              { name: "CISA", logo: <Shield size={32} className="text-[#0B1E3D]" /> },
              { name: "Google Workspace", logo: <div className="grid grid-cols-2 gap-0.5 w-9 h-9"><div className="bg-[#4285F4] rounded-sm" /><div className="bg-[#EA4335] rounded-sm" /><div className="bg-[#FBBC05] rounded-sm" /><div className="bg-[#34A853] rounded-sm" /></div> },
            ].map(p => (
              <motion.div key={p.name} variants={fadeUp} className="flex flex-col items-center gap-3 group">
                <div className="w-16 h-16 bg-white rounded-xl shadow-md flex items-center justify-center group-hover:shadow-lg transition-shadow">
                  {p.logo}
                </div>
                <span className="text-gray-400 text-sm font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{p.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* CTA */}
      <section className="py-20 bg-[#0B1E3D]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Let's Have Coffee & Talk</h2>
          <p className="text-white/70 text-lg mb-8" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
            Schedule a free consultation and discover how we can protect your organization.
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
