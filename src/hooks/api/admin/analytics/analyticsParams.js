/**
 * Pure helper to sanitize/build raw URL search params into the exact shape
 * expected by the GET /admin/analytics endpoint.
 *
 * Can be called safely from both Server Components (page.jsx) and Client
 * Components without triggering client-only hook bundling errors.
 */
export function buildAnalyticsParams(raw = {}) {
  const allowedRanges = ["7d", "30d", "3m", "6m", "1y"];
  const rawRange = (raw?.range || "7d").toLowerCase();
  const range = allowedRanges.includes(rawRange) ? rawRange : "7d";

  return { range };
}
