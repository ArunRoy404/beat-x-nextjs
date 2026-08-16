// Deliberately NOT "use client" — this must be importable from the SSR
// page.jsx (Server Component) as well as client containers/hooks. Keeping
// it out of usePodcasts.js (which is "use client") matters: any export from
// a "use client" file becomes client-only, and a Server Component can't
// call it directly.
export const PODCASTS_PAGE_SIZE = 10

export function buildPodcastsParams(raw = {}) {
  const status = raw.status
  const genre = raw.genre
  const q = raw.q
  const page = Number(raw.page) || 1

  return {
    page,
    limit: PODCASTS_PAGE_SIZE,
    ...(status && status !== "all" && { status }),
    ...(genre && genre !== "all" && { genre }),
    ...(q && { q }),
  }
}
