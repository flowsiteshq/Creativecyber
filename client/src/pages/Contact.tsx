import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Calendar, MapPin, ArrowRight, CheckCircle, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

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

export default function Contact() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", company: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Message sent! We'll be in touch within 24 hours.");
    },
    onError: (err) => {
      toast.error("Failed to send message. Please try again or email us directly.");
      console.error(err);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    submitMutation.mutate(form);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-[#060F1E] via-[#0B1E3D] to-[#0D2347]">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #1E6FD9 0%, transparent 50%), radial-gradient(circle at 70% 50%, #D4A843 0%, transparent 50%)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#D4A843]/20 border border-[#D4A843]/30 text-[#D4A843] text-xs font-semibold tracking-widest uppercase mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Contact Us
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Let's Protect Your
              <span className="block text-[#D4A843] italic">Business Together</span>
            </h1>
            <p className="text-white/70 text-xl max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              No techno-babble, just clear, actionable cybersecurity guidance tailored to your organization.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <AnimatedSection className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: Info */}
            <div>
              <motion.div variants={fadeUp} className="inline-block px-4 py-1.5 rounded-full bg-[#1E6FD9]/10 text-[#1E6FD9] text-xs font-semibold tracking-widest uppercase mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Get In Touch</motion.div>
              <motion.h2 variants={fadeUp} className="text-4xl font-bold text-[#0B1E3D] mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                We'd Love to Hear From You
              </motion.h2>
              <motion.p variants={fadeUp} className="text-gray-500 leading-relaxed mb-10" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                Reach out to schedule your free consultation. We speak your language — no techno-babble, just clear, actionable cybersecurity guidance tailored to your organization.
              </motion.p>

              <motion.div variants={stagger} className="space-y-6 mb-10">
                {[
                  { icon: Mail, label: "Email", value: "info@creativecybermanagement.com", href: "mailto:info@creativecybermanagement.com" },
                  { icon: MapPin, label: "Location", value: "Atlanta, GA", href: null },
                  { icon: Calendar, label: "Appointments", value: "By Appointment Only", href: null },
                ].map(item => (
                  <motion.div key={item.label} variants={fadeUp} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#0B1E3D]/5 flex items-center justify-center shrink-0">
                      <item.icon size={20} className="text-[#1E6FD9]" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.label}</div>
                      {item.href ? (
                        <a href={item.href} className="text-[#0B1E3D] font-medium hover:text-[#1E6FD9] transition-colors" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>{item.value}</a>
                      ) : (
                        <span className="text-[#0B1E3D] font-medium" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>{item.value}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Schedule CTA */}
              <motion.div variants={fadeUp} className="bg-[#F8F9FC] rounded-2xl p-6 border border-gray-100">
                <h3 className="font-bold text-[#0B1E3D] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Prefer to Schedule Directly?</h3>
                <p className="text-gray-500 text-sm mb-4" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Use our online scheduler to pick a date and time that works for you.</p>
                <Link href="/schedule">
                  <span className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#D4A843] text-[#0B1E3D] font-bold text-sm hover:bg-[#c49a35] transition-colors cursor-pointer" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Schedule Appointment <Calendar size={16} />
                  </span>
                </Link>
              </motion.div>
            </div>

            {/* Right: Contact Form */}
            <motion.div variants={fadeUp}>
              {submitted ? (
                <div className="bg-[#F8F9FC] rounded-2xl p-12 border border-gray-100 text-center h-full flex flex-col items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} className="text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0B1E3D] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Message Sent!</h3>
                  <p className="text-gray-500 mb-6" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                    Thank you for reaching out. We'll respond within 24 business hours.
                  </p>
                  <Link href="/schedule">
                    <span className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#D4A843] text-[#0B1E3D] font-bold text-sm cursor-pointer" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      Schedule a Consultation <ArrowRight size={16} />
                    </span>
                  </Link>
                </div>
              ) : (
                <div className="bg-[#F8F9FC] rounded-2xl p-8 border border-gray-100">
                  <h3 className="text-2xl font-bold text-[#0B1E3D] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Send Us a Message</h3>
                  <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { key: "firstName", label: "First Name *", placeholder: "John", type: "text" },
                        { key: "lastName", label: "Last Name *", placeholder: "Smith", type: "text" },
                      ].map(f => (
                        <div key={f.key}>
                          <label className="block text-xs font-semibold text-gray-500 mb-1.5 tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{f.label}</label>
                          <input
                            type={f.type}
                            value={form[f.key as keyof typeof form]}
                            onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-[#0B1E3D] text-sm focus:outline-none focus:ring-2 focus:ring-[#1E6FD9]/30 focus:border-[#1E6FD9] transition-all"
                            placeholder={f.placeholder}
                            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                          />
                        </div>
                      ))}
                    </div>
                    {[
                      { key: "email", label: "Email Address *", placeholder: "john@company.com", type: "email" },
                      { key: "company", label: "Organization", placeholder: "Your Company Name", type: "text" },
                    ].map(f => (
                      <div key={f.key}>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5 tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{f.label}</label>
                        <input
                          type={f.type}
                          value={form[f.key as keyof typeof form]}
                          onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-[#0B1E3D] text-sm focus:outline-none focus:ring-2 focus:ring-[#1E6FD9]/30 focus:border-[#1E6FD9] transition-all"
                          placeholder={f.placeholder}
                          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                        />
                      </div>
                    ))}
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5 tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>How Can We Help? *</label>
                      <textarea
                        rows={5}
                        value={form.message}
                        onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-[#0B1E3D] text-sm focus:outline-none focus:ring-2 focus:ring-[#1E6FD9]/30 focus:border-[#1E6FD9] transition-all resize-none"
                        placeholder="Tell us about your cybersecurity needs..."
                        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submitMutation.isPending}
                      className="w-full py-4 rounded-lg text-base font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-60"
                      style={{ backgroundColor: "#D4A843", color: "#0B1E3D", fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {submitMutation.isPending ? "Sending..." : <>Send Message <ArrowRight size={18} /></>}
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      <Footer />
    </div>
  );
}
