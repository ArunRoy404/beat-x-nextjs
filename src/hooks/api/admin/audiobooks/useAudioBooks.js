"use client"

import { useQuery } from "@tanstack/react-query"
import { getAudioBooksRequest } from "@/services/admin/audioBooksServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

// Shared by the SSR page (prefetch) and the container's initial/unfiltered
// state so their query keys match and hydration actually skips the spinner.
export const AUDIOBOOKS_PAGE_SIZE = 6
export const DEFAULT_AUDIOBOOKS_PARAMS = { page: 1, limit: AUDIOBOOKS_PAGE_SIZE }

/**
 * Fetches a paginated, filterable admin audiobooks list.
 *   const { data, isLoading, isError, error, refetch } = useAudioBooks({ status, genre, q, page, limit })
 *   data => { data: AudioBook[], total, page, limit }
 */
export function useAudioBooks(params) {
  return useQuery({
    queryKey: queryKeys.audiobooks.list(params),
    queryFn: () => getAudioBooksRequest(params),
  })
}
