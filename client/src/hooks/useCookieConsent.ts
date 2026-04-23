import { useState, useEffect, useCallback } from "react";

export type ConsentCategory = "necessary" | "analytics" | "functionality" | "marketing";

export interface CookieConsent {
  necessary: boolean;      // Always true — cannot be disabled
  analytics: boolean;      // Google Analytics, Hotjar, etc.
  functionality: boolean;  // Chat history, preferences, language
  marketing: boolean;      // Retargeting, ad pixels
}

export interface ConsentState {
  hasDecided: boolean;     // Has the user made any decision?
  consent: CookieConsent;
  consentDate: string | null;
  version: string;         // Bump this when policy changes to re-prompt
}

const STORAGE_KEY = "ccm_cookie_consent";
const CONSENT_VERSION = "1.0"; // Increment when Cookie Policy changes

const defaultConsent: CookieConsent = {
  necessary: true,
  analytics: false,
  functionality: false,
  marketing: false,
};

const fullConsent: CookieConsent = {
  necessary: true,
  analytics: true,
  functionality: true,
  marketing: true,
};

function loadFromStorage(): ConsentState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { hasDecided: false, consent: defaultConsent, consentDate: null, version: CONSENT_VERSION };
    const parsed: ConsentState = JSON.parse(raw);
    // Re-prompt if policy version changed
    if (parsed.version !== CONSENT_VERSION) {
      return { hasDecided: false, consent: defaultConsent, consentDate: null, version: CONSENT_VERSION };
    }
    // Always ensure necessary is true
    parsed.consent.necessary = true;
    return parsed;
  } catch {
    return { hasDecided: false, consent: defaultConsent, consentDate: null, version: CONSENT_VERSION };
  }
}

function saveToStorage(state: ConsentState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage unavailable (private browsing, etc.)
  }
}

export function useCookieConsent() {
  const [state, setState] = useState<ConsentState>(() => loadFromStorage());
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    // Show banner only after a short delay so page loads first
    if (!state.hasDecided) {
      const timer = setTimeout(() => setShowBanner(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [state.hasDecided]);

  const acceptAll = useCallback(() => {
    const newState: ConsentState = {
      hasDecided: true,
      consent: fullConsent,
      consentDate: new Date().toISOString(),
      version: CONSENT_VERSION,
    };
    setState(newState);
    saveToStorage(newState);
    setShowBanner(false);
    setShowPreferences(false);
  }, []);

  const rejectNonEssential = useCallback(() => {
    const newState: ConsentState = {
      hasDecided: true,
      consent: defaultConsent,
      consentDate: new Date().toISOString(),
      version: CONSENT_VERSION,
    };
    setState(newState);
    saveToStorage(newState);
    setShowBanner(false);
    setShowPreferences(false);
  }, []);

  const savePreferences = useCallback((preferences: Omit<CookieConsent, "necessary">) => {
    const newState: ConsentState = {
      hasDecided: true,
      consent: { necessary: true, ...preferences },
      consentDate: new Date().toISOString(),
      version: CONSENT_VERSION,
    };
    setState(newState);
    saveToStorage(newState);
    setShowBanner(false);
    setShowPreferences(false);
  }, []);

  const openPreferences = useCallback(() => {
    setShowPreferences(true);
    setShowBanner(false);
  }, []);

  const closePreferences = useCallback(() => {
    setShowPreferences(false);
    if (!state.hasDecided) setShowBanner(true);
  }, [state.hasDecided]);

  const resetConsent = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    const fresh: ConsentState = { hasDecided: false, consent: defaultConsent, consentDate: null, version: CONSENT_VERSION };
    setState(fresh);
    setShowBanner(true);
  }, []);

  return {
    state,
    showBanner,
    showPreferences,
    acceptAll,
    rejectNonEssential,
    savePreferences,
    openPreferences,
    closePreferences,
    resetConsent,
  };
}
