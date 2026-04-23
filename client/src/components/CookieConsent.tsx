import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Cookie, X, ChevronDown, ChevronUp, Check, Settings2, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { useCookieConsent, type CookieConsent as CookieConsentType } from "@/hooks/useCookieConsent";

// ─── Cookie Category Data ──────────────────────────────────────────────────────
const categories = [
  {
    key: "necessary" as const,
    label: "Strictly Necessary",
    description:
      "These cookies are essential for the website to function. They enable core features such as page navigation, secure form submission, and session management. They cannot be disabled.",
    always: true,
    examples: "Session cookies, CSRF tokens, load balancer cookies",
  },
  {
    key: "functionality" as const,
    label: "Functionality",
    description:
      "These cookies allow the website to remember choices you make (such as your chat history, language preferences, or appointment details) to provide a more personalized experience.",
    always: false,
    examples: "Chat history, form auto-fill, UI preferences",
  },
  {
    key: "analytics" as const,
    label: "Analytics & Performance",
    description:
      "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website and services.",
    always: false,
    examples: "Page views, session duration, traffic sources",
  },
  {
    key: "marketing" as const,
    label: "Marketing & Targeting",
    description:
      "These cookies may be set by our advertising partners to build a profile of your interests and show you relevant advertisements on other sites. They do not store personal information directly.",
    always: false,
    examples: "Ad retargeting, conversion tracking, social media pixels",
  },
];

// ─── Toggle Switch ─────────────────────────────────────────────────────────────
function Toggle({ checked, onChange, disabled }: { checked: boolean; onChange: (v: boolean) => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9] ${
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
      } ${checked ? "bg-[#1E6FD9]" : "bg-gray-300"}`}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

// ─── Preferences Modal ─────────────────────────────────────────────────────────
function PreferencesModal({
  onClose,
  onSave,
  onAcceptAll,
  initialConsent,
}: {
  onClose: () => void;
  onSave: (prefs: Omit<CookieConsentType, "necessary">) => void;
  onAcceptAll: () => void;
  initialConsent: CookieConsentType;
}) {
  const [prefs, setPrefs] = useState({
    analytics: initialConsent.analytics,
    functionality: initialConsent.functionality,
    marketing: initialConsent.marketing,
  });
  const [expanded, setExpanded] = useState<string | null>("necessary");

  const toggle = (key: keyof typeof prefs) => {
    setPrefs((p) => ({ ...p, [key]: !p[key] }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(6, 15, 30, 0.85)", backdropFilter: "blur(6px)" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#1E6FD9]/10 flex items-center justify-center">
              <Settings2 size={18} className="text-[#1E6FD9]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#0B1E3D]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Cookie Preferences
              </h2>
              <p className="text-xs text-gray-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Manage your consent settings
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body — scrollable */}
        <div className="overflow-y-auto flex-1 px-6 py-5">
          <p className="text-sm text-gray-500 mb-5 leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
            We use cookies to enhance your browsing experience, serve personalised content, and analyse our traffic. You can choose which categories to allow below. For more information, read our{" "}
            <Link href="/cookies">
              <span className="text-[#1E6FD9] hover:underline cursor-pointer inline-flex items-center gap-0.5">
                Cookie Policy <ExternalLink size={11} />
              </span>
            </Link>
            .
          </p>

          <div className="space-y-3">
            {categories.map((cat) => {
              const isOn = cat.always ? true : prefs[cat.key as keyof typeof prefs] ?? false;
              const isExpanded = expanded === cat.key;

              return (
                <div key={cat.key} className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 bg-gray-50">
                    <button
                      type="button"
                      className="flex items-center gap-2 flex-1 text-left"
                      onClick={() => setExpanded(isExpanded ? null : cat.key)}
                    >
                      <span className="text-sm font-semibold text-[#0B1E3D]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {cat.label}
                      </span>
                      {cat.always && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#1E6FD9]/10 text-[#1E6FD9] uppercase tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          Always Active
                        </span>
                      )}
                      {isExpanded ? (
                        <ChevronUp size={14} className="text-gray-400 ml-auto mr-3" />
                      ) : (
                        <ChevronDown size={14} className="text-gray-400 ml-auto mr-3" />
                      )}
                    </button>
                    <Toggle
                      checked={isOn}
                      onChange={() => !cat.always && toggle(cat.key as keyof typeof prefs)}
                      disabled={cat.always}
                    />
                  </div>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 py-3 bg-white border-t border-gray-100">
                          <p className="text-xs text-gray-500 leading-relaxed mb-2" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                            {cat.description}
                          </p>
                          <p className="text-xs text-gray-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            <span className="font-semibold text-gray-500">Examples:</span> {cat.examples}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 shrink-0 flex flex-col sm:flex-row gap-3 justify-end">
          <button
            onClick={() => onSave(prefs)}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold border border-[#0B1E3D] text-[#0B1E3D] hover:bg-[#0B1E3D] hover:text-white transition-all"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Save My Preferences
          </button>
          <button
            onClick={onAcceptAll}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:brightness-110"
            style={{ backgroundColor: "#1E6FD9", fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Accept All Cookies
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Banner ───────────────────────────────────────────────────────────────
export default function CookieConsentBanner() {
  const {
    state,
    showBanner,
    showPreferences,
    acceptAll,
    rejectNonEssential,
    savePreferences,
    openPreferences,
    closePreferences,
  } = useCookieConsent();

  return (
    <>
      {/* Main consent banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="fixed bottom-0 left-0 right-0 z-[9998] px-4 pb-4 sm:pb-6"
            role="dialog"
            aria-modal="true"
            aria-label="Cookie consent"
          >
            <div className="max-w-5xl mx-auto bg-[#0B1E3D] rounded-2xl shadow-2xl overflow-hidden border border-white/10">
              {/* Gold accent line */}
              <div className="h-1 w-full bg-gradient-to-r from-[#D4A843] via-[#F0C060] to-[#D4A843]" />

              <div className="px-5 py-5 sm:px-7 sm:py-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-5">
                  {/* Icon + Text */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-10 h-10 rounded-xl bg-[#D4A843]/15 flex items-center justify-center shrink-0 mt-0.5">
                      <Cookie size={20} className="text-[#D4A843]" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-base mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                        We value your privacy
                      </h3>
                      <p className="text-white/60 text-sm leading-relaxed max-w-2xl" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                        We use cookies to enhance your browsing experience, personalise content, and analyse site traffic. By clicking{" "}
                        <strong className="text-white/80">Accept All</strong>, you consent to our use of cookies. You may also{" "}
                        <button
                          onClick={openPreferences}
                          className="text-[#D4A843] hover:underline font-medium"
                        >
                          manage your preferences
                        </button>{" "}
                        or read our{" "}
                        <Link href="/cookies">
                          <span className="text-[#D4A843] hover:underline cursor-pointer">Cookie Policy</span>
                        </Link>
                        .
                      </p>

                      {/* Compliance badges */}
                      <div className="flex flex-wrap gap-3 mt-3">
                        {["GDPR Compliant", "CCPA Compliant", "No 3rd-Party Tracking by Default"].map((badge) => (
                          <span
                            key={badge}
                            className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-white/50 uppercase tracking-widest"
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                          >
                            <Check size={10} className="text-[#D4A843]" />
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-2.5 shrink-0">
                    <button
                      onClick={rejectNonEssential}
                      className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white/60 hover:text-white border border-white/20 hover:border-white/40 transition-all whitespace-nowrap"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      Reject Non-Essential
                    </button>
                    <button
                      onClick={openPreferences}
                      className="px-5 py-2.5 rounded-lg text-sm font-semibold text-[#0B1E3D] bg-white/90 hover:bg-white transition-all whitespace-nowrap"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      <Settings2 size={14} className="inline mr-1.5 -mt-0.5" />
                      Manage Preferences
                    </button>
                    <button
                      onClick={acceptAll}
                      className="px-5 py-2.5 rounded-lg text-sm font-bold text-[#0B1E3D] transition-all hover:brightness-110 whitespace-nowrap"
                      style={{ backgroundColor: "#D4A843", fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      Accept All
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preferences modal */}
      <AnimatePresence>
        {showPreferences && (
          <PreferencesModal
            onClose={closePreferences}
            onSave={savePreferences}
            onAcceptAll={acceptAll}
            initialConsent={state.consent}
          />
        )}
      </AnimatePresence>

      {/* Floating "Cookie Settings" button — shown after consent has been given */}
      {state.hasDecided && !showBanner && !showPreferences && (
        <button
          onClick={openPreferences}
          title="Cookie Settings"
          className="fixed bottom-6 left-6 z-[9990] w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 hover:shadow-xl"
          style={{ backgroundColor: "#0B1E3D", border: "2px solid #D4A843" }}
          aria-label="Open cookie preferences"
        >
          <Cookie size={16} className="text-[#D4A843]" />
        </button>
      )}
    </>
  );
}

// ─── Re-export hook for use elsewhere ─────────────────────────────────────────
export { useCookieConsent };
