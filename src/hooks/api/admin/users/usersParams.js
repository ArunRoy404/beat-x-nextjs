/**
 * Sanitize and build URL search parameters for the admin users endpoint
 * (GET /admin/users). This is a pure helper function (no React hooks)
 * suitable for both Server and Client Components.
 */
const VALID_STATUSES = ["active", "suspended", "banned"];
const VALID_ROLES = ["user", "artist", "developer"];

export function buildUsersParams(raw = {}) {
  const params = {};

  const status = String(raw.status || "").toLowerCase();
  if (VALID_STATUSES.includes(status)) {
    params.status = status;
  }

  const role = String(raw.role || "").toLowerCase();
  if (VALID_ROLES.includes(role)) {
    params.role = role;
  }

  if (raw.q && typeof raw.q === "string" && raw.q.trim()) {
    params.q = raw.q.trim();
  } else if (raw.search && typeof raw.search === "string" && raw.search.trim()) {
    params.q = raw.search.trim();
  }

  params.page = Number(raw.page) || 1;
  params.limit = Number(raw.limit) || 20;

  return params;
}
