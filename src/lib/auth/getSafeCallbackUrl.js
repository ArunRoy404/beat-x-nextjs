/**
 * Only ever follow same-origin, relative callback URLs. A bare `startsWith("/")`
 * isn't enough — "//evil.com" is a protocol-relative URL the browser will
 * happily treat as external, so it's rejected too.
 */
export function getSafeCallbackUrl(callbackUrl, fallback) {
  if (callbackUrl && callbackUrl.startsWith("/") && !callbackUrl.startsWith("//")) {
    return callbackUrl;
  }
  return fallback;
}
