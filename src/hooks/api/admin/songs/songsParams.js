// Deliberately NOT "use client" — this must be importable from the SSR
// page.jsx (Server Component) as well as client containers/hooks. Keeping
// it out of useSongs.js (which is "use client") matters: any export from a
// "use client" file becomes client-only, and a Server Component can't call
// it directly.
import { normalizeSongStatus } from "@/lib/constants/songStatus"

export const SONGS_PAGE_SIZE = 20
// GET /admin/songs caps `limit` at 50 — anything larger is a 400.
export const SONGS_MAX_PAGE_SIZE = 50

// A repeated query param (?q=a&q=b) arrives as an array, so every value is
// coerced to a single string before use — this runs inside the SSR render,
// where a `.trim()` on an array would take the whole page down.
const firstString = (value) => {
  if (Array.isArray(value)) return typeof value[0] === "string" ? value[0] : ""
  return typeof value === "string" ? value : ""
}

/**
 * Resolves raw URL search params (from the browser's useSearchParams() or
 * the server page's searchParams prop — both are plain string-keyed objects)
 * into the exact params object sent to GET /admin/songs. Used by both the
 * SSR page (prefetch) and the client container so their query keys always
 * match, whatever filters/page are in the URL.
 */
export function buildSongsParams(raw = {}) {
  const rawStatus = firstString(raw?.status)
  const status =
    rawStatus && rawStatus !== "all" ? normalizeSongStatus(rawStatus) : undefined

  const genre = firstString(raw?.genre)
  const album = firstString(raw?.album)
  const q = firstString(raw?.q).trim() || undefined
  const page = Math.max(1, Number(firstString(raw?.page)) || 1)
  const limit = Math.min(
    SONGS_MAX_PAGE_SIZE,
    Math.max(1, Number(firstString(raw?.limit)) || SONGS_PAGE_SIZE)
  )

  return {
    page,
    limit,
    ...(status && { status }),
    ...(genre && genre !== "all" && { genre }),
    ...(album && album !== "all" && { album }),
    ...(q && { q }),
  }
}
