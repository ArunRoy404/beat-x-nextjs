/**
 * Only ever follow same-origin, relative callback URLs. A bare `startsWith("/")`
 * isn't enough — "//evil.com" is a protocol-relative URL the browser will
 * happily treat as external, so it's rejected too.
 */
const AUTH_PAGES = [
  "/login",
  "/register",
  "/verify-email",
  "/forgot-password",
  "/otp-verification",
  "/reset-password",
  "/admin/login",
  "/admin/forgot-password",
  "/admin/otp-verification",
  "/admin/reset-password",
];

export function getSafeCallbackUrl(callbackUrl, fallback) {
  if (callbackUrl && callbackUrl.startsWith("/") && !callbackUrl.startsWith("//")) {
    const cleanPath = callbackUrl.split("?")[0].toLowerCase();
    if (AUTH_PAGES.some((authPath) => cleanPath === authPath || cleanPath === `${authPath}/`)) {
      return fallback;
    }
    if (callbackUrl === "/admin/dashboard" || callbackUrl === "/admin/dashboard/") {
      return "/admin/dashboard/overview";
    }
    return callbackUrl;
  }
  return fallback;
}
