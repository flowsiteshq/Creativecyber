import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Clock, Calendar, Tag } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blogPosts";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className={className} variants={stagger} initial="hidden" animate={isInView ? "visible" : "hidden"}>
      {children}
    </motion.div>
  );
}

export default function Blog() {
  const [featured, ...rest] = blogPosts;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-[#0B1E3D]">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #1E6FD9 0%, transparent 50%), radial-gradient(circle at 80% 50%, #D4A843 0%, transparent 50%)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4A843]/40 text-[#D4A843] text-xs font-bold tracking-widest uppercase mb-6"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Resources & Insights
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl font-bold text-white mb-5 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Cybersecurity Knowledge<br />
            <span className="text-[#D4A843] italic">Without the Techno-Babble</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/70 text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
            Practical cybersecurity guidance for business owners, healthcare professionals, and non-profit leaders — written in plain language by the experts at Creative Cyber Management.
          </motion.p>
        </div>
      </section>

      {/* ── Featured Article ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="mb-8">
              <span className="text-xs font-bold tracking-widest uppercase text-[#D4A843]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Featured Article
              </span>
            </motion.div>
            <motion.div variants={fadeUp}>
              <Link href={`/blog/${featured.slug}`}>
                <div className="group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-xl border border-gray-100 cursor-pointer hover:shadow-2xl transition-shadow duration-300">
                  {/* Image */}
                  <div className="relative h-72 lg:h-auto overflow-hidden">
                    <img
                      src={featured.heroImage}
                      alt={featured.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0B1E3D]/60 to-transparent" />
                    <div className="absolute top-6 left-6">
                      <span
                        className="px-3 py-1.5 rounded-full text-xs font-bold text-white"
                        style={{ backgroundColor: featured.categoryColor, fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {featured.category}
                      </span>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="bg-white p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-4 text-gray-400 text-xs mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      <span className="flex items-center gap-1.5"><Calendar size={13} />{featured.publishDate}</span>
                      <span className="flex items-center gap-1.5"><Clock size={13} />{featured.readTime}</span>
                    </div>
                    <h2 className="text-3xl font-bold text-[#0B1E3D] mb-4 leading-tight group-hover:text-[#1E6FD9] transition-colors"
                      style={{ fontFamily: "'Playfair Display', serif" }}>
                      {featured.title}
                    </h2>
                    <p className="text-gray-500 leading-relaxed mb-6 text-base" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                      {featured.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#0B1E3D] flex items-center justify-center text-white font-bold text-sm"
                          style={{ fontFamily: "'Playfair Display', serif" }}>
                          {featured.author.charAt(0)}
                        </div>
                        <div>
                          <div className="text-[#0B1E3D] font-semibold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{featured.author}</div>
                          <div className="text-gray-400 text-xs" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{featured.authorTitle}</div>
                        </div>
                      </div>
                      <span className="flex items-center gap-2 text-[#1E6FD9] font-semibold text-sm group-hover:gap-3 transition-all"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        Read Article <ArrowRight size={15} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Article Grid ── */}
      <section className="py-8 pb-24 bg-[#F8F9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="mb-10">
              <h2 className="text-3xl font-bold text-[#0B1E3D]" style={{ fontFamily: "'Playfair Display', serif" }}>
                More Articles
                <div className="w-12 h-1 bg-[#D4A843] mt-3" />
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {rest.map((post) => (
                <motion.div key={post.slug} variants={fadeUp}>
                  <Link href={`/blog/${post.slug}`}>
                    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-col">
                      {/* Image */}
                      <div className="relative h-52 overflow-hidden">
                        <img
                          src={post.heroImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E3D]/50 to-transparent" />
                        <div className="absolute top-4 left-4">
                          <span
                            className="px-3 py-1 rounded-full text-xs font-bold text-white"
                            style={{ backgroundColor: post.categoryColor, fontFamily: "'Space Grotesk', sans-serif" }}
                          >
                            {post.category}
                          </span>
                        </div>
                      </div>
                      {/* Content */}
                      <div className="p-7 flex flex-col flex-1">
                        <div className="flex items-center gap-4 text-gray-400 text-xs mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          <span className="flex items-center gap-1.5"><Calendar size={12} />{post.publishDate}</span>
                          <span className="flex items-center gap-1.5"><Clock size={12} />{post.readTime}</span>
                        </div>
                        <h3 className="text-xl font-bold text-[#0B1E3D] mb-3 leading-snug group-hover:text-[#1E6FD9] transition-colors"
                          style={{ fontFamily: "'Playfair Display', serif" }}>
                          {post.title}
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-[#0B1E3D] flex items-center justify-center text-white font-bold text-xs"
                              style={{ fontFamily: "'Playfair Display', serif" }}>
                              {post.author.charAt(0)}
                            </div>
                            <span className="text-gray-500 text-xs" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{post.author}</span>
                          </div>
                          <span className="flex items-center gap-1.5 text-[#1E6FD9] font-semibold text-xs group-hover:gap-2.5 transition-all"
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            Read <ArrowRight size={13} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Topics Band ── */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-10">
              <div className="flex items-center justify-center gap-2 text-[#D4A843] text-xs font-bold tracking-widest uppercase mb-3"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                <Tag size={14} /> Topics We Cover
              </div>
              <h2 className="text-3xl font-bold text-[#0B1E3D]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Cybersecurity Expertise Across Every Domain
              </h2>
            </motion.div>
            <motion.div variants={stagger} className="flex flex-wrap justify-center gap-3">
              {[
                { label: "HIPAA Compliance", color: "#1E6FD9" },
                { label: "Zero-Trust Security", color: "#D4A843" },
                { label: "AI Security", color: "#7C3AED" },
                { label: "vCISO Services", color: "#0B1E3D" },
                { label: "Network Security", color: "#059669" },
                { label: "Ransomware Defense", color: "#DC2626" },
                { label: "Microsoft 365 Hardening", color: "#00A4EF" },
                { label: "Phishing Prevention", color: "#D97706" },
                { label: "Incident Response", color: "#7C3AED" },
                { label: "Cyber Insurance", color: "#0B1E3D" },
              ].map((topic) => (
                <motion.span
                  key={topic.label}
                  variants={fadeUp}
                  className="px-5 py-2.5 rounded-full text-sm font-semibold text-white cursor-default"
                  style={{ backgroundColor: topic.color, fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {topic.label}
                </motion.span>
              ))}
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-[#0B1E3D]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <AnimatedSection>
            <motion.h2 variants={fadeUp} className="text-4xl font-bold text-white mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
              Ready to Protect Your Organization?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/70 text-lg mb-8" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              Schedule a free consultation with our team and get a clear, plain-language assessment of your cybersecurity posture.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link href="/schedule">
                <span className="inline-flex items-center gap-2 px-10 py-4 rounded font-bold text-base cursor-pointer transition-all hover:brightness-110"
                  style={{ backgroundColor: "#D4A843", color: "#0B1E3D", fontFamily: "'Space Grotesk', sans-serif" }}>
                  Schedule A Free Consultation <ArrowRight size={18} />
                </span>
              </Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
