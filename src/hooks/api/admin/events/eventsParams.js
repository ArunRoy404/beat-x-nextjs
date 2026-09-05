/**
 * Sanitize and build URL search parameters for admin events/tours endpoint.
 * This is a pure helper function (no React hooks) suitable for both Server and Client Components.
 */
export function buildEventsParams(raw = {}) {
  const params = {}

  if (raw.status && typeof raw.status === "string" && raw.status.toLowerCase() !== "all") {
    params.status = raw.status.toLowerCase().replace(/ /g, "_")
  }

  if (raw.q && typeof raw.q === "string" && raw.q.trim()) {
    params.q = raw.q.trim()
  } else if (raw.search && typeof raw.search === "string" && raw.search.trim()) {
    params.q = raw.search.trim()
  }

  params.page = Number(raw.page) || 1
  params.limit = Number(raw.limit) || 20

  return params
}
