"use client"

import { useQuery } from "@tanstack/react-query"
import { getSongDetailRequest } from "@/services/admin/songsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 * Fetches a single song. Disabled until an id is given.
 *   const { data: song, isLoading, refetch } = useSongDetail(id)
 */
export function useSongDetail(id) {
  return useQuery({
    queryKey: queryKeys.music.detail(id),
    queryFn: () => getSongDetailRequest({ id }),
    enabled: Boolean(id),
  })
}
