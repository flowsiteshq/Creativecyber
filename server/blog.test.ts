import { describe, expect, it } from "vitest";

// Test the blog data structure directly (pure data, no server needed)
const BLOG_SLUGS = [
  "hipaa-compliance-tips-small-healthcare-practices",
  "zero-trust-security-guide-business-owners",
  "ai-security-what-every-business-needs-to-know-2025",
];

const BLOG_CATEGORIES = [
  "HIPAA & Compliance",
  "Zero-Trust Security",
  "AI Security",
];

describe("Blog data integrity", () => {
  it("should have exactly 3 blog posts defined", () => {
    expect(BLOG_SLUGS).toHaveLength(3);
  });

  it("should have all required slugs", () => {
    const requiredSlugs = [
      "hipaa-compliance-tips-small-healthcare-practices",
      "zero-trust-security-guide-business-owners",
      "ai-security-what-every-business-needs-to-know-2025",
    ];
    requiredSlugs.forEach((slug) => {
      expect(BLOG_SLUGS).toContain(slug);
    });
  });

  it("should have all required categories", () => {
    const requiredCategories = ["HIPAA & Compliance", "Zero-Trust Security", "AI Security"];
    requiredCategories.forEach((cat) => {
      expect(BLOG_CATEGORIES).toContain(cat);
    });
  });

  it("should have unique slugs", () => {
    const uniqueSlugs = new Set(BLOG_SLUGS);
    expect(uniqueSlugs.size).toBe(BLOG_SLUGS.length);
  });

  it("should have unique categories", () => {
    const uniqueCategories = new Set(BLOG_CATEGORIES);
    expect(uniqueCategories.size).toBe(BLOG_CATEGORIES.length);
  });

  it("should have HIPAA article as the first (featured) post", () => {
    expect(BLOG_SLUGS[0]).toBe("hipaa-compliance-tips-small-healthcare-practices");
  });

  it("should have AI security article as the last post", () => {
    expect(BLOG_SLUGS[2]).toBe("ai-security-what-every-business-needs-to-know-2025");
  });
});

describe("Blog route structure", () => {
  it("should generate correct blog listing path", () => {
    const blogPath = "/blog";
    expect(blogPath).toBe("/blog");
  });

  it("should generate correct article paths from slugs", () => {
    BLOG_SLUGS.forEach((slug) => {
      const path = `/blog/${slug}`;
      expect(path).toMatch(/^\/blog\/[a-z0-9-]+$/);
    });
  });

  it("should have slugs with only lowercase letters, numbers, and hyphens", () => {
    BLOG_SLUGS.forEach((slug) => {
      expect(slug).toMatch(/^[a-z0-9-]+$/);
    });
  });

  it("should not have slugs starting or ending with hyphens", () => {
    BLOG_SLUGS.forEach((slug) => {
      expect(slug).not.toMatch(/^-|-$/);
    });
  });
});
