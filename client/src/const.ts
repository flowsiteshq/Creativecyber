import { buildLoginUrl } from "@/lib/authRedirect";

export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// Build a login URL only when sign-in is requested. Custom-domain deployments
// may not include Manus OAuth variables, which must never break public pages.
export const getLoginUrl = (): string | null => {
  if (typeof window === "undefined") return null;

  return buildLoginUrl({
    oauthPortalUrl: import.meta.env.VITE_OAUTH_PORTAL_URL,
    appId: import.meta.env.VITE_APP_ID,
    redirectUri: `${window.location.origin}/api/oauth/callback`,
  });
};

export const startLogin = (): boolean => {
  const loginUrl = getLoginUrl();
  if (!loginUrl) {
    console.error("[Auth] Sign-in is unavailable because OAuth is not configured for this deployment.");
    return false;
  }

  window.location.assign(loginUrl);
  return true;
};
