/**
 * Sanitize and build URL search parameters for admin artist verification endpoint.
 * This is a pure helper function (no React hooks) suitable for both Server and Client Components.
 */
export function buildArtistsParams(raw = {}) {
  const params = {};

  if (raw.tab && typeof raw.tab === "string" && raw.tab.toLowerCase() !== "all") {
    params.tab = raw.tab.toLowerCase();
  }

  if (raw.q && typeof raw.q === "string" && raw.q.trim()) {
    params.q = raw.q.trim();
  }

  params.page = Number(raw.page) || 1;
  params.limit = Number(raw.limit) || 20;

  return params;
}
