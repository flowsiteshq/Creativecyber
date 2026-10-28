import { describe, expect, it } from "vitest";
import { buildLoginUrl } from "../client/src/lib/authRedirect";

describe("buildLoginUrl", () => {
  const redirectUri = "https://creativecybermanagement.com/api/oauth/callback";

  it("builds a sign-in URL when OAuth deployment configuration is valid", () => {
    const loginUrl = buildLoginUrl({
      oauthPortalUrl: "https://auth.example.com",
      appId: "creative-cyber-management",
      redirectUri,
    });

    const parsed = new URL(loginUrl ?? "");
    expect(parsed.origin).toBe("https://auth.example.com");
    expect(parsed.pathname).toBe("/app-auth");
    expect(parsed.searchParams.get("appId")).toBe("creative-cyber-management");
    expect(parsed.searchParams.get("redirectUri")).toBe(redirectUri);
    expect(parsed.searchParams.get("state")).toBe(btoa(redirectUri));
    expect(parsed.searchParams.get("type")).toBe("signIn");
  });

  it.each([
    { oauthPortalUrl: undefined, appId: "creative-cyber-management" },
    { oauthPortalUrl: "", appId: "creative-cyber-management" },
    { oauthPortalUrl: "not a URL", appId: "creative-cyber-management" },
    { oauthPortalUrl: "ftp://auth.example.com", appId: "creative-cyber-management" },
    { oauthPortalUrl: "https://auth.example.com", appId: undefined },
  ])("returns null instead of throwing for incomplete or invalid deployment configuration", config => {
    expect(() =>
      buildLoginUrl({
        oauthPortalUrl: config.oauthPortalUrl,
        appId: config.appId,
        redirectUri,
      })
    ).not.toThrow();

    expect(
      buildLoginUrl({
        oauthPortalUrl: config.oauthPortalUrl,
        appId: config.appId,
        redirectUri,
      })
    ).toBeNull();
  });
});
