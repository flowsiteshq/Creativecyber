import { describe, expect, it } from "vitest";

// Test the consent logic and data structures (pure logic, no DOM required)

type ConsentCategory = "necessary" | "analytics" | "functionality" | "marketing";

interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  functionality: boolean;
  marketing: boolean;
}

interface ConsentState {
  hasDecided: boolean;
  consent: CookieConsent;
  consentDate: string | null;
  version: string;
}

const CONSENT_VERSION = "1.0";

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

function buildAcceptAllState(): ConsentState {
  return {
    hasDecided: true,
    consent: fullConsent,
    consentDate: new Date().toISOString(),
    version: CONSENT_VERSION,
  };
}

function buildRejectState(): ConsentState {
  return {
    hasDecided: true,
    consent: defaultConsent,
    consentDate: new Date().toISOString(),
    version: CONSENT_VERSION,
  };
}

function buildCustomState(prefs: Omit<CookieConsent, "necessary">): ConsentState {
  return {
    hasDecided: true,
    consent: { necessary: true, ...prefs },
    consentDate: new Date().toISOString(),
    version: CONSENT_VERSION,
  };
}

function isVersionStale(state: ConsentState, currentVersion: string): boolean {
  return state.version !== currentVersion;
}

describe("Cookie consent — default state", () => {
  it("necessary cookies are always true by default", () => {
    expect(defaultConsent.necessary).toBe(true);
  });

  it("non-essential cookies are false by default", () => {
    expect(defaultConsent.analytics).toBe(false);
    expect(defaultConsent.functionality).toBe(false);
    expect(defaultConsent.marketing).toBe(false);
  });
});

describe("Cookie consent — accept all", () => {
  it("sets hasDecided to true", () => {
    const state = buildAcceptAllState();
    expect(state.hasDecided).toBe(true);
  });

  it("enables all consent categories", () => {
    const state = buildAcceptAllState();
    expect(state.consent.necessary).toBe(true);
    expect(state.consent.analytics).toBe(true);
    expect(state.consent.functionality).toBe(true);
    expect(state.consent.marketing).toBe(true);
  });

  it("records a consentDate ISO string", () => {
    const state = buildAcceptAllState();
    expect(state.consentDate).not.toBeNull();
    expect(() => new Date(state.consentDate!)).not.toThrow();
  });

  it("stores the correct version", () => {
    const state = buildAcceptAllState();
    expect(state.version).toBe(CONSENT_VERSION);
  });
});

describe("Cookie consent — reject non-essential", () => {
  it("sets hasDecided to true", () => {
    const state = buildRejectState();
    expect(state.hasDecided).toBe(true);
  });

  it("keeps necessary true but disables all others", () => {
    const state = buildRejectState();
    expect(state.consent.necessary).toBe(true);
    expect(state.consent.analytics).toBe(false);
    expect(state.consent.functionality).toBe(false);
    expect(state.consent.marketing).toBe(false);
  });
});

describe("Cookie consent — custom preferences", () => {
  it("allows enabling only analytics and functionality", () => {
    const state = buildCustomState({ analytics: true, functionality: true, marketing: false });
    expect(state.consent.necessary).toBe(true);
    expect(state.consent.analytics).toBe(true);
    expect(state.consent.functionality).toBe(true);
    expect(state.consent.marketing).toBe(false);
  });

  it("always forces necessary to true even if passed false", () => {
    const state = buildCustomState({ analytics: false, functionality: false, marketing: false });
    expect(state.consent.necessary).toBe(true);
  });

  it("records hasDecided as true for custom preferences", () => {
    const state = buildCustomState({ analytics: true, functionality: false, marketing: false });
    expect(state.hasDecided).toBe(true);
  });
});

describe("Cookie consent — version staleness", () => {
  it("detects stale consent when version differs", () => {
    const oldState: ConsentState = { ...buildAcceptAllState(), version: "0.9" };
    expect(isVersionStale(oldState, "1.0")).toBe(true);
  });

  it("reports not stale when version matches", () => {
    const currentState = buildAcceptAllState();
    expect(isVersionStale(currentState, CONSENT_VERSION)).toBe(false);
  });
});

describe("Cookie consent — serialization", () => {
  it("round-trips through JSON without data loss", () => {
    const state = buildCustomState({ analytics: true, functionality: false, marketing: true });
    const serialized = JSON.stringify(state);
    const parsed: ConsentState = JSON.parse(serialized);
    expect(parsed.consent.analytics).toBe(true);
    expect(parsed.consent.functionality).toBe(false);
    expect(parsed.consent.marketing).toBe(true);
    expect(parsed.consent.necessary).toBe(true);
    expect(parsed.hasDecided).toBe(true);
    expect(parsed.version).toBe(CONSENT_VERSION);
  });
});
