import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ArrowLeft, Clock, Calendar, Tag, Share2, BookOpen } from "lucide-react";
import { Link, useParams } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getBlogPost, getRelatedPosts } from "@/data/blogPosts";
import { Streamdown } from "streamdown";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
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

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const post = getBlogPost(params.slug);
  const related = getRelatedPosts(params.slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center flex-col gap-6 pt-32">
          <BookOpen size={64} className="text-gray-300" />
          <h1 className="text-3xl font-bold text-[#0B1E3D]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Article Not Found
          </h1>
          <p className="text-gray-500" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
            The article you're looking for doesn't exist or has been moved.
          </p>
          <Link href="/blog">
            <span className="flex items-center gap-2 px-6 py-3 rounded font-bold text-sm cursor-pointer"
              style={{ backgroundColor: "#D4A843", color: "#0B1E3D", fontFamily: "'Space Grotesk', sans-serif" }}>
              <ArrowLeft size={15} /> Back to Blog
            </span>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: post.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-24 pb-0 overflow-hidden">
        <div
          className="relative h-[480px] sm:h-[560px] overflow-hidden"
          style={{ backgroundImage: `url(${post.heroImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E3D]/90 via-[#0B1E3D]/60 to-[#0B1E3D]/30" />
          <div className="relative z-10 h-full flex flex-col justify-end max-w-4xl mx-auto px-4 sm:px-6 pb-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-white/50 text-xs mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                <Link href="/blog"><span className="hover:text-white/80 cursor-pointer transition-colors">Blog</span></Link>
                <span>/</span>
                <span className="text-white/70">{post.category}</span>
              </div>
              {/* Category badge */}
              <span
                className="inline-block px-3 py-1.5 rounded-full text-xs font-bold text-white mb-5"
                style={{ backgroundColor: post.categoryColor, fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {post.category}
              </span>
              <h1
                className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {post.title}
              </h1>
              <p className="text-white/80 text-lg leading-relaxed mb-6 max-w-2xl" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                {post.subtitle}
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#D4A843] flex items-center justify-center text-[#0B1E3D] font-bold"
                    style={{ fontFamily: "'Playfair Display', serif" }}>
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{post.author}</div>
                    <div className="text-white/50 text-xs" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{post.authorTitle}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-white/60 text-xs" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  <span className="flex items-center gap-1.5"><Calendar size={13} />{post.publishDate}</span>
                  <span className="flex items-center gap-1.5"><Clock size={13} />{post.readTime}</span>
                </div>
                <button
                  onClick={handleShare}
                  className="ml-auto flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  <Share2 size={13} /> Share
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Article Body ── */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
            {/* Main content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="prose-ccm">
                <Streamdown>{post.content}</Streamdown>
              </div>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-2">
                <span className="flex items-center gap-1.5 text-gray-400 text-xs mr-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  <Tag size={13} /> Topics:
                </span>
                {[post.category, "Cybersecurity", "Business Security"].map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-[#F8F9FC] text-gray-500 text-xs font-medium border border-gray-200"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA Box */}
              <div className="mt-10 bg-[#0B1E3D] rounded-2xl p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Ready to Take Action?
                </h3>
                <p className="text-white/70 mb-6" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                  Schedule a free consultation with our team. We'll assess your current security posture and provide a clear, actionable roadmap — no techno-babble.
                </p>
                <Link href="/schedule">
                  <span className="inline-flex items-center gap-2 px-8 py-3.5 rounded font-bold text-sm cursor-pointer transition-all hover:brightness-110"
                    style={{ backgroundColor: "#D4A843", color: "#0B1E3D", fontFamily: "'Space Grotesk', sans-serif" }}>
                    Schedule A Free Consultation <ArrowRight size={16} />
                  </span>
                </Link>
              </div>
            </motion.div>

            {/* Sidebar */}
            <div className="hidden lg:block">
              <div className="sticky top-28 space-y-6">
                {/* Author Card */}
                <div className="bg-[#F8F9FC] rounded-2xl p-6 border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#0B1E3D] flex items-center justify-center text-white font-bold text-lg"
                      style={{ fontFamily: "'Playfair Display', serif" }}>
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-[#0B1E3D] text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{post.author}</div>
                      <div className="text-gray-400 text-xs" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{post.authorTitle}</div>
                    </div>
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                    Burton Maben is the founder of Creative Cyber Management LLC, a cybersecurity firm specializing in zero-trust security, HIPAA compliance, and AI-powered threat defense for small and mid-sized organizations.
                  </p>
                </div>

                {/* Quick Links */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                  <h4 className="font-bold text-[#0B1E3D] text-sm mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Our Services
                  </h4>
                  <div className="space-y-2">
                    {[
                      { label: "vCISO Program", href: "/services" },
                      { label: "HIPAA Compliance", href: "/services" },
                      { label: "Network Security", href: "/services" },
                      { label: "AI Solutions", href: "/ai-solutions" },
                      { label: "Free Consultation", href: "/schedule" },
                    ].map(item => (
                      <Link key={item.label} href={item.href}>
                        <span className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-[#F8F9FC] text-gray-600 hover:text-[#1E6FD9] text-xs font-medium transition-colors cursor-pointer group"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          {item.label}
                          <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Share */}
                <button
                  onClick={handleShare}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl border-2 border-[#0B1E3D] text-[#0B1E3D] font-bold text-sm hover:bg-[#0B1E3D] hover:text-white transition-all"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  <Share2 size={15} /> Share This Article
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related Articles ── */}
      {related.length > 0 && (
        <section className="py-16 bg-[#F8F9FC] border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <motion.div variants={fadeUp} className="mb-10">
                <h2 className="text-3xl font-bold text-[#0B1E3D]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Related Articles
                  <div className="w-12 h-1 bg-[#D4A843] mt-3" />
                </h2>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {related.map(rp => (
                  <motion.div key={rp.slug} variants={fadeUp}>
                    <Link href={`/blog/${rp.slug}`}>
                      <div className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col">
                        <div className="relative h-48 overflow-hidden">
                          <img src={rp.heroImage} alt={rp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E3D]/50 to-transparent" />
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 rounded-full text-xs font-bold text-white"
                              style={{ backgroundColor: rp.categoryColor, fontFamily: "'Space Grotesk', sans-serif" }}>
                              {rp.category}
                            </span>
                          </div>
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                          <div className="flex items-center gap-3 text-gray-400 text-xs mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            <span className="flex items-center gap-1.5"><Calendar size={12} />{rp.publishDate}</span>
                            <span className="flex items-center gap-1.5"><Clock size={12} />{rp.readTime}</span>
                          </div>
                          <h3 className="text-xl font-bold text-[#0B1E3D] mb-3 leading-snug group-hover:text-[#1E6FD9] transition-colors"
                            style={{ fontFamily: "'Playfair Display', serif" }}>
                            {rp.title}
                          </h3>
                          <p className="text-gray-500 text-sm leading-relaxed flex-1" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                            {rp.excerpt.slice(0, 150)}…
                          </p>
                          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-end">
                            <span className="flex items-center gap-1.5 text-[#1E6FD9] font-semibold text-xs group-hover:gap-2.5 transition-all"
                              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                              Read Article <ArrowRight size={13} />
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
      )}

      {/* ── Back to Blog ── */}
      <section className="py-10 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog">
            <span className="inline-flex items-center gap-2 text-[#1E6FD9] font-semibold text-sm hover:gap-3 transition-all cursor-pointer"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <ArrowLeft size={15} /> Back to All Articles
            </span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
