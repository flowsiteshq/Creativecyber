export type LoginUrlOptions = {
  oauthPortalUrl: string | undefined;
  appId: string | undefined;
  redirectUri: string;
};

/**
 * Builds the Manus OAuth sign-in URL when the deployment provides a complete,
 * valid browser configuration. Returning null lets public pages remain usable
 * on custom domains where OAuth variables are intentionally unavailable.
 */
export function buildLoginUrl({
  oauthPortalUrl,
  appId,
  redirectUri,
}: LoginUrlOptions): string | null {
  const portal = oauthPortalUrl?.trim();
  const normalizedAppId = appId?.trim();

  if (!portal || !normalizedAppId || !redirectUri) return null;

  try {
    const portalUrl = new URL(portal);
    const redirectUrl = new URL(redirectUri);

    if (
      !["http:", "https:"].includes(portalUrl.protocol) ||
      !["http:", "https:"].includes(redirectUrl.protocol)
    ) {
      return null;
    }

    const loginUrl = new URL(
      "app-auth",
      portalUrl.href.endsWith("/") ? portalUrl.href : `${portalUrl.href}/`
    );
    loginUrl.searchParams.set("appId", normalizedAppId);
    loginUrl.searchParams.set("redirectUri", redirectUrl.toString());
    loginUrl.searchParams.set("state", btoa(redirectUrl.toString()));
    loginUrl.searchParams.set("type", "signIn");

    return loginUrl.toString();
  } catch {
    return null;
  }
}
