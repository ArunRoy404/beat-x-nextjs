"use client"

import { useQuery } from "@tanstack/react-query"
import { getSongsRequest } from "@/services/admin/songsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

// Shared by the SSR page (prefetch) and the container's initial/unfiltered
// state so their query keys match and hydration actually skips the spinner.
export const SONGS_PAGE_SIZE = 10
export const DEFAULT_SONGS_PARAMS = { page: 1, limit: SONGS_PAGE_SIZE }

/**
 * Fetches a paginated, filterable admin songs list.
 *   const { data, isLoading, isError, error, refetch } = useSongs({ status, genre, q, page, limit })
 *   data => { data: Song[], total, page, limit }
 */
export function useSongs(params) {
  return useQuery({
    queryKey: queryKeys.music.list(params),
    queryFn: () => getSongsRequest(params),
  })
}
