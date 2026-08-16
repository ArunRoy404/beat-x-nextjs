// Deliberately NOT "use client" — this must be importable from the SSR
// page.jsx (Server Component) as well as client containers/hooks. Keeping
// it out of useSongs.js (which is "use client") matters: any export from a
// "use client" file becomes client-only, and a Server Component can't call
// it directly.
export const SONGS_PAGE_SIZE = 10

/**
 * Resolves raw URL search params (from the browser's useSearchParams() or
 * the server page's searchParams prop — both are plain string-keyed objects)
 * into the exact params object sent to GET /admin/songs. Used by both the
 * SSR page (prefetch) and the client container so their query keys always
 * match, whatever filters/page are in the URL.
 */
export function buildSongsParams(raw = {}) {
  const status = raw.status
  const genre = raw.genre
  const q = raw.q
  const page = Number(raw.page) || 1

  return {
    page,
    limit: SONGS_PAGE_SIZE,
    ...(status && status !== "all" && { status }),
    ...(genre && genre !== "all" && { genre }),
    ...(q && { q }),
  }
}
