"use client"

import { useUrlListParams } from "@/hooks/useUrlListParams"
import { buildSongsParams } from "./songsParams"

/**
 * The single client-side reader of the songs list URL state.
 *
 * Both the stats header (AdminDashboardMusicPage) and the table
 * (SongsContainer) subscribe to the same query, so they have to derive byte
 * identical params — otherwise they'd hold two cache entries and fire two
 * requests. Deriving them here once also keeps the client in step with the
 * SSR page, which feeds its raw `searchParams` straight into
 * buildSongsParams: every key the server reads off the URL is read here too,
 * `limit` included, so the prefetched cache entry is the one the client asks
 * for and first paint needs no refetch.
 */
export function useSongsListParams() {
  const { get, setParams } = useUrlListParams()

  const filters = {
    status: get("status", "all"),
    genre: get("genre", "all"),
    album: get("album", "all"),
    q: get("q", ""),
    page: get("page", "1"),
    limit: get("limit", ""),
  }

  return {
    filters,
    params: buildSongsParams(filters),
    page: Number(filters.page) || 1,
    get,
    setParams,
  }
}
