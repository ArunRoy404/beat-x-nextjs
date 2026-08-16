"use client"

import { useQuery } from "@tanstack/react-query"
import { getSongsRequest } from "@/services/admin/songsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

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
