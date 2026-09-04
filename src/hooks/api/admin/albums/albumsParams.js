// Deliberately NOT "use client" — this must be importable from the SSR
// page.jsx (Server Component) as well as client containers/hooks. Keeping
// it out of useAlbums.js (which is "use client") matters: any export from
// a "use client" file becomes client-only, and a Server Component can't
// call it directly.
export const ALBUMS_PAGE_SIZE = 20

export function buildAlbumsParams(raw = {}) {
  const status = raw?.status
  const genre = raw?.genre
  const q = raw?.q?.trim() || undefined
  const page = Number(raw?.page) || 1
  const limit = Number(raw?.limit) || ALBUMS_PAGE_SIZE

  return {
    page,
    limit,
    ...(status && status !== "all" && { status }),
    ...(genre && genre !== "all" && { genre }),
    ...(q && { q }),
  }
}
