import { describe, expect, it } from "vitest";

// We test the legal content structure by importing the raw data
// (server-side import of client data module for structural validation)
import {
  termsContent,
  privacyContent,
  cookieContent,
  disclaimerContent,
  COMPANY_NAME,
  COMPANY_EMAIL,
  EFFECTIVE_DATE,
  LAST_UPDATED,
} from "../client/src/data/legalContent";

describe("Legal content — constants", () => {
  it("has correct company name", () => {
    expect(COMPANY_NAME).toBe("Creative Cyber Management, LLC");
  });

  it("has a valid company email", () => {
    expect(COMPANY_EMAIL).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it("has non-empty effective date and last updated", () => {
    expect(EFFECTIVE_DATE.length).toBeGreaterThan(0);
    expect(LAST_UPDATED.length).toBeGreaterThan(0);
  });
});

describe("Terms & Conditions", () => {
  it("has a title and subtitle", () => {
    expect(termsContent.title).toBe("Terms & Conditions");
    expect(termsContent.subtitle.length).toBeGreaterThan(10);
  });

  it("has at least 8 sections", () => {
    expect(termsContent.sections.length).toBeGreaterThanOrEqual(8);
  });

  it("every section has a non-empty heading and body", () => {
    for (const section of termsContent.sections) {
      expect(section.heading.length).toBeGreaterThan(0);
      expect(section.body.length).toBeGreaterThan(50);
    }
  });

  it("includes limitation of liability section", () => {
    const hasLiability = termsContent.sections.some((s) =>
      s.heading.toLowerCase().includes("liability")
    );
    expect(hasLiability).toBe(true);
  });
});

describe("Privacy Policy", () => {
  it("has a title and subtitle", () => {
    expect(privacyContent.title).toBe("Privacy Policy");
    expect(privacyContent.subtitle.length).toBeGreaterThan(10);
  });

  it("has at least 8 sections", () => {
    expect(privacyContent.sections.length).toBeGreaterThanOrEqual(8);
  });

  it("includes data security section", () => {
    const hasSecurity = privacyContent.sections.some((s) =>
      s.heading.toLowerCase().includes("security")
    );
    expect(hasSecurity).toBe(true);
  });

  it("includes children's privacy section", () => {
    const hasChildren = privacyContent.sections.some((s) =>
      s.heading.toLowerCase().includes("children")
    );
    expect(hasChildren).toBe(true);
  });
});

describe("Cookie Policy", () => {
  it("has a title and subtitle", () => {
    expect(cookieContent.title).toBe("Cookie Policy");
    expect(cookieContent.subtitle.length).toBeGreaterThan(10);
  });

  it("has at least 4 sections", () => {
    expect(cookieContent.sections.length).toBeGreaterThanOrEqual(4);
  });

  it("explains different types of cookies", () => {
    const hasTypes = cookieContent.sections.some((s) =>
      s.heading.toLowerCase().includes("types")
    );
    expect(hasTypes).toBe(true);
  });
});

describe("Disclaimer", () => {
  it("has a title and subtitle", () => {
    expect(disclaimerContent.title).toBe("Disclaimer");
    expect(disclaimerContent.subtitle.length).toBeGreaterThan(10);
  });

  it("has at least 5 sections", () => {
    expect(disclaimerContent.sections.length).toBeGreaterThanOrEqual(5);
  });

  it("includes AI chatbot disclaimer section", () => {
    const hasAI = disclaimerContent.sections.some((s) =>
      s.heading.toLowerCase().includes("ai") || s.heading.toLowerCase().includes("chatbot")
    );
    expect(hasAI).toBe(true);
  });

  it("includes cybersecurity limitations section", () => {
    const hasCyber = disclaimerContent.sections.some((s) =>
      s.heading.toLowerCase().includes("cyber") || s.heading.toLowerCase().includes("limitation")
    );
    expect(hasCyber).toBe(true);
  });
});
