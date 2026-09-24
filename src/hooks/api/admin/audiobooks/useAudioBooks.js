"use client"

import { useQuery } from "@tanstack/react-query"
import { getAudioBooksRequest } from "@/services/admin/audioBooksServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 * Fetches a paginated, filterable admin audiobooks list.
 *   const { data, isLoading, isError, error, refetch } = useAudioBooks({ status, genre, q, page, limit })
 *   data => { audio: AudioBook[], total, page, limit } (the real server response —
 *   the Postman collection's saved example showed `data` instead of `audio`)
 */
export function useAudioBooks(params) {
  return useQuery({
    queryKey: queryKeys.audiobooks.list(params),
    queryFn: () => getAudioBooksRequest(params),
  })
}
