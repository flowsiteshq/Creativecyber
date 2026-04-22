import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft, ChevronRight, Calendar, Clock, User, CheckCircle, ArrowRight, Shield
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────
type Step = "service" | "date" | "time" | "details" | "confirm";

interface BookingData {
  service: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  notes: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    id: "vciso",
    name: "Virtual CISO Program",
    duration: "60 min",
    desc: "Discuss your organization's security posture and how our vCISO program can help.",
    icon: Shield,
    color: "#1E6FD9",
  },
  {
    id: "compliance",
    name: "Compliance Management",
    duration: "45 min",
    desc: "Review your compliance requirements and how we automate HIPAA and statutory compliance.",
    icon: CheckCircle,
    color: "#D4A843",
  },
  {
    id: "network",
    name: "Network Security Assessment",
    duration: "45 min",
    desc: "Explore our vulnerability management and network security assessment process.",
    icon: Shield,
    color: "#0B1E3D",
  },
  {
    id: "ai",
    name: "AI Solutions Consultation",
    duration: "60 min",
    desc: "Discover how Microsoft Azure AI and Copilot can transform your security operations.",
    icon: Shield,
    color: "#7C3AED",
  },
  {
    id: "general",
    name: "General Consultation",
    duration: "30 min",
    desc: "Not sure where to start? Let's have a conversation about your security needs.",
    icon: User,
    color: "#059669",
  },
];

const MONTHS = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-").map(Number);
  const d = new Date(year, month - 1, day);
  return d.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

function formatTime(timeStr: string): string {
  if (!timeStr) return "";
  const [h, m] = timeStr.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${m.toString().padStart(2, "0")} ${period}`;
}

// ─── Calendar Component ───────────────────────────────────────────────────────
function CalendarPicker({ selected, onSelect }: { selected: string; onSelect: (d: string) => void }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = Array.from({ length: firstDay + daysInMonth }, (_, i) =>
    i < firstDay ? null : i - firstDay + 1
  );

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const isDisabled = (day: number) => {
    const d = new Date(year, month, day);
    d.setHours(0, 0, 0, 0);
    return d < today || d.getDay() === 0 || d.getDay() === 6;
  };

  const toDateStr = (day: number) => `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={prevMonth} className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
          <ChevronLeft size={18} className="text-gray-600" />
        </button>
        <span className="font-bold text-[#0B1E3D] text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
          {MONTHS[month]} {year}
        </span>
        <button onClick={nextMonth} className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
          <ChevronRight size={18} className="text-gray-600" />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS.map(d => (
          <div key={d} className="text-center text-xs font-semibold text-gray-400 py-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{d}</div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} />;
          const dateStr = toDateStr(day);
          const disabled = isDisabled(day);
          const isSelected = selected === dateStr;
          const isToday = dateStr === toDateStr.call(null, today.getDate()) &&
            month === today.getMonth() && year === today.getFullYear();
          return (
            <button
              key={dateStr}
              disabled={disabled}
              onClick={() => onSelect(dateStr)}
              className={`
                h-10 w-full rounded-lg text-sm font-medium transition-all
                ${disabled ? "text-gray-300 cursor-not-allowed" : "hover:bg-[#1E6FD9]/10 cursor-pointer"}
                ${isSelected ? "bg-[#1E6FD9] text-white hover:bg-[#1E6FD9]" : ""}
                ${isToday && !isSelected ? "border-2 border-[#D4A843] text-[#0B1E3D]" : ""}
                ${!disabled && !isSelected ? "text-[#0B1E3D]" : ""}
              `}
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Time Slots Component ─────────────────────────────────────────────────────
function TimeSlots({ date, selected, onSelect }: { date: string; selected: string; onSelect: (t: string) => void }) {
  const { data: slots, isLoading } = trpc.appointments.getAvailableSlots.useQuery(
    { date },
    { enabled: !!date }
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="h-12 rounded-lg bg-gray-100 animate-pulse" />
        ))}
      </div>
    );
  }

  if (!slots || slots.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
        No available slots for this date. Please select another day.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      {slots.map(slot => (
        <button
          key={slot}
          onClick={() => onSelect(slot)}
          className={`py-3 rounded-lg text-sm font-semibold transition-all border ${
            selected === slot
              ? "bg-[#1E6FD9] text-white border-[#1E6FD9]"
              : "bg-white text-[#0B1E3D] border-gray-200 hover:border-[#1E6FD9] hover:text-[#1E6FD9]"
          }`}
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {formatTime(slot)}
        </button>
      ))}
    </div>
  );
}

// ─── Step Progress ────────────────────────────────────────────────────────────
const STEPS: { id: Step; label: string }[] = [
  { id: "service", label: "Service" },
  { id: "date", label: "Date" },
  { id: "time", label: "Time" },
  { id: "details", label: "Details" },
  { id: "confirm", label: "Confirm" },
];

function StepProgress({ current }: { current: Step }) {
  const idx = STEPS.findIndex(s => s.id === current);
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {STEPS.map((step, i) => (
        <div key={step.id} className="flex items-center">
          <div className={`flex flex-col items-center ${i <= idx ? "opacity-100" : "opacity-40"}`}>
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
              i < idx ? "bg-[#1E6FD9] text-white" : i === idx ? "bg-[#D4A843] text-[#0B1E3D]" : "bg-gray-200 text-gray-500"
            }`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {i < idx ? <CheckCircle size={16} /> : i + 1}
            </div>
            <span className="text-xs mt-1 font-medium text-gray-500 hidden sm:block" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{step.label}</span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`w-8 sm:w-14 h-0.5 mx-1 transition-all ${i < idx ? "bg-[#1E6FD9]" : "bg-gray-200"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Schedule() {
  const [step, setStep] = useState<Step>("service");
  const [booking, setBooking] = useState<BookingData>({
    service: "", date: "", time: "",
    firstName: "", lastName: "", email: "", phone: "", company: "", notes: "",
  });
  const [booked, setBooked] = useState(false);

  const bookMutation = trpc.appointments.book.useMutation({
    onSuccess: () => { setBooked(true); },
    onError: (err) => { toast.error("Booking failed. Please try again."); console.error(err); },
  });

  const selectedService = SERVICES.find(s => s.id === booking.service);

  const handleBook = () => {
    if (!booking.firstName || !booking.lastName || !booking.email) {
      toast.error("Please fill in all required fields.");
      return;
    }
    bookMutation.mutate({
      firstName: booking.firstName,
      lastName: booking.lastName,
      email: booking.email,
      phone: booking.phone || undefined,
      company: booking.company || undefined,
      service: selectedService?.name ?? booking.service,
      appointmentDate: booking.date,
      appointmentTime: booking.time,
      notes: booking.notes || undefined,
    });
  };

  const inputClass = "w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-[#0B1E3D] text-sm focus:outline-none focus:ring-2 focus:ring-[#1E6FD9]/30 focus:border-[#1E6FD9] transition-all";
  const labelClass = "block text-xs font-semibold text-gray-500 mb-1.5 tracking-wide";

  if (booked) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="min-h-[70vh] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full text-center"
          >
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={48} className="text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-[#0B1E3D] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              Appointment Booked!
            </h2>
            <p className="text-gray-500 mb-2" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              Your consultation has been scheduled for:
            </p>
            <div className="bg-[#F8F9FC] rounded-xl p-5 mb-6 border border-gray-100">
              <p className="font-bold text-[#0B1E3D] text-lg mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                {selectedService?.name}
              </p>
              <p className="text-[#1E6FD9] font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {formatDate(booking.date)} at {formatTime(booking.time)}
              </p>
            </div>
            <p className="text-gray-400 text-sm mb-6" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              A confirmation will be sent to <strong>{booking.email}</strong>. We look forward to speaking with you!
            </p>
            <a href="/" className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-[#D4A843] text-[#0B1E3D] font-bold hover:bg-[#c49a35] transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Back to Home
            </a>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-[#060F1E] via-[#0B1E3D] to-[#0D2347]">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #1E6FD9 0%, transparent 50%), radial-gradient(circle at 70% 50%, #D4A843 0%, transparent 50%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#D4A843]/20 border border-[#D4A843]/30 text-[#D4A843] text-xs font-semibold tracking-widest uppercase mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Free Consultation
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Schedule Your Consultation
            </h1>
            <p className="text-white/70 text-lg" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              No techno-babble. Just a straight conversation about protecting your organization.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Scheduler */}
      <div className="py-16 bg-[#F8F9FC] min-h-[60vh]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <StepProgress current={step} />

          <AnimatePresence mode="wait">
            {/* STEP 1: Service */}
            {step === "service" && (
              <motion.div key="service" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                <h2 className="text-2xl font-bold text-[#0B1E3D] mb-2 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>Select a Service</h2>
                <p className="text-gray-500 text-center mb-8 text-sm" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Choose the type of consultation you'd like to schedule.</p>
                <div className="space-y-3">
                  {SERVICES.map(svc => (
                    <button
                      key={svc.id}
                      onClick={() => { setBooking(b => ({ ...b, service: svc.id })); setStep("date"); }}
                      className={`w-full text-left p-5 rounded-xl border-2 transition-all hover:shadow-md ${
                        booking.service === svc.id ? "border-[#1E6FD9] bg-[#1E6FD9]/5" : "border-gray-200 bg-white hover:border-[#1E6FD9]/50"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${svc.color}15` }}>
                          <svc.icon size={20} style={{ color: svc.color }} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-[#0B1E3D]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{svc.name}</span>
                            <span className="text-xs text-gray-400 flex items-center gap-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                              <Clock size={12} /> {svc.duration}
                            </span>
                          </div>
                          <p className="text-gray-500 text-sm mt-0.5" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>{svc.desc}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 2: Date */}
            {step === "date" && (
              <motion.div key="date" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                <h2 className="text-2xl font-bold text-[#0B1E3D] mb-2 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>Select a Date</h2>
                <p className="text-gray-500 text-center mb-8 text-sm" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Choose a weekday for your {selectedService?.name} consultation.</p>
                <CalendarPicker selected={booking.date} onSelect={date => { setBooking(b => ({ ...b, date, time: "" })); setStep("time"); }} />
                <button onClick={() => setStep("service")} className="mt-6 flex items-center gap-2 text-gray-400 hover:text-[#0B1E3D] text-sm transition-colors mx-auto" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  <ChevronLeft size={16} /> Back
                </button>
              </motion.div>
            )}

            {/* STEP 3: Time */}
            {step === "time" && (
              <motion.div key="time" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                <h2 className="text-2xl font-bold text-[#0B1E3D] mb-2 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>Select a Time</h2>
                <p className="text-gray-500 text-center mb-2 text-sm" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                  Available slots for <strong>{formatDate(booking.date)}</strong>
                </p>
                <p className="text-gray-400 text-center mb-8 text-xs" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>All times are Eastern Time (ET)</p>
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <TimeSlots date={booking.date} selected={booking.time} onSelect={time => { setBooking(b => ({ ...b, time })); setStep("details"); }} />
                </div>
                <button onClick={() => setStep("date")} className="mt-6 flex items-center gap-2 text-gray-400 hover:text-[#0B1E3D] text-sm transition-colors mx-auto" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  <ChevronLeft size={16} /> Back
                </button>
              </motion.div>
            )}

            {/* STEP 4: Details */}
            {step === "details" && (
              <motion.div key="details" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                <h2 className="text-2xl font-bold text-[#0B1E3D] mb-2 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>Your Details</h2>
                <p className="text-gray-500 text-center mb-8 text-sm" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Tell us a bit about yourself so we can prepare for your consultation.</p>
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>First Name *</label>
                      <input className={inputClass} placeholder="John" value={booking.firstName} onChange={e => setBooking(b => ({ ...b, firstName: e.target.value }))} style={{ fontFamily: "'Source Sans 3', sans-serif" }} />
                    </div>
                    <div>
                      <label className={labelClass} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Last Name *</label>
                      <input className={inputClass} placeholder="Smith" value={booking.lastName} onChange={e => setBooking(b => ({ ...b, lastName: e.target.value }))} style={{ fontFamily: "'Source Sans 3', sans-serif" }} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Email Address *</label>
                    <input type="email" className={inputClass} placeholder="john@company.com" value={booking.email} onChange={e => setBooking(b => ({ ...b, email: e.target.value }))} style={{ fontFamily: "'Source Sans 3', sans-serif" }} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Phone Number</label>
                      <input type="tel" className={inputClass} placeholder="+1 (555) 000-0000" value={booking.phone} onChange={e => setBooking(b => ({ ...b, phone: e.target.value }))} style={{ fontFamily: "'Source Sans 3', sans-serif" }} />
                    </div>
                    <div>
                      <label className={labelClass} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Organization</label>
                      <input className={inputClass} placeholder="Your Company Name" value={booking.company} onChange={e => setBooking(b => ({ ...b, company: e.target.value }))} style={{ fontFamily: "'Source Sans 3', sans-serif" }} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Notes (Optional)</label>
                    <textarea rows={3} className={`${inputClass} resize-none`} placeholder="Any specific topics you'd like to discuss..." value={booking.notes} onChange={e => setBooking(b => ({ ...b, notes: e.target.value }))} style={{ fontFamily: "'Source Sans 3', sans-serif" }} />
                  </div>
                  <button
                    onClick={() => {
                      if (!booking.firstName || !booking.lastName || !booking.email) { toast.error("Please fill in required fields."); return; }
                      setStep("confirm");
                    }}
                    className="w-full py-4 rounded-lg font-bold text-base flex items-center justify-center gap-2 transition-all"
                    style={{ backgroundColor: "#D4A843", color: "#0B1E3D", fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Review Booking <ArrowRight size={18} />
                  </button>
                </div>
                <button onClick={() => setStep("time")} className="mt-6 flex items-center gap-2 text-gray-400 hover:text-[#0B1E3D] text-sm transition-colors mx-auto" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  <ChevronLeft size={16} /> Back
                </button>
              </motion.div>
            )}

            {/* STEP 5: Confirm */}
            {step === "confirm" && (
              <motion.div key="confirm" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                <h2 className="text-2xl font-bold text-[#0B1E3D] mb-2 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>Confirm Your Booking</h2>
                <p className="text-gray-500 text-center mb-8 text-sm" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Please review your appointment details before confirming.</p>
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <div className="space-y-4">
                    {[
                      { label: "Service", value: selectedService?.name ?? "" },
                      { label: "Date", value: formatDate(booking.date) },
                      { label: "Time", value: `${formatTime(booking.time)} ET` },
                      { label: "Duration", value: selectedService?.duration ?? "" },
                      { label: "Name", value: `${booking.firstName} ${booking.lastName}` },
                      { label: "Email", value: booking.email },
                      ...(booking.phone ? [{ label: "Phone", value: booking.phone }] : []),
                      ...(booking.company ? [{ label: "Organization", value: booking.company }] : []),
                      ...(booking.notes ? [{ label: "Notes", value: booking.notes }] : []),
                    ].map(item => (
                      <div key={item.label} className="flex justify-between items-start py-3 border-b border-gray-100 last:border-0">
                        <span className="text-gray-400 text-sm font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.label}</span>
                        <span className="text-[#0B1E3D] text-sm font-medium text-right max-w-[60%]" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-[#F8F9FC] rounded-xl text-xs text-gray-400 text-center" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                    By confirming, you agree to our appointment policy. We'll send a confirmation to your email.
                  </div>
                  <button
                    onClick={handleBook}
                    disabled={bookMutation.isPending}
                    className="w-full mt-5 py-4 rounded-lg font-bold text-base flex items-center justify-center gap-2 transition-all disabled:opacity-60"
                    style={{ backgroundColor: "#D4A843", color: "#0B1E3D", fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {bookMutation.isPending ? "Booking..." : <><CheckCircle size={18} /> Confirm Appointment</>}
                  </button>
                </div>
                <button onClick={() => setStep("details")} className="mt-6 flex items-center gap-2 text-gray-400 hover:text-[#0B1E3D] text-sm transition-colors mx-auto" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  <ChevronLeft size={16} /> Back
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </div>
  );
}
