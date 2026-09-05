/**
 * Sanitize and build URL search parameters for admin subscriptions module.
 * Pure helper function (no React hooks) suitable for both Server and Client Components.
 */
export function buildSubscriptionsParams(raw = {}) {
  const params = {};

  if (raw.tab && typeof raw.tab === "string" && raw.tab.toLowerCase() === "subscribers") {
    params.tab = "subscribers";
  } else {
    params.tab = "plans";
  }

  if (raw.filter && typeof raw.filter === "string" && raw.filter.toLowerCase() !== "all") {
    params.filter = raw.filter.toLowerCase();
  }

  if (raw.q && typeof raw.q === "string" && raw.q.trim()) {
    params.q = raw.q.trim();
  }

  params.page = Number(raw.page) || 1;
  params.limit = Number(raw.limit) || 5;

  return params;
}
