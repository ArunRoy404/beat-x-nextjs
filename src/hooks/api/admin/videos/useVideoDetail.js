"use client"

import { useQuery } from "@tanstack/react-query"
import { getVideoDetailRequest } from "@/services/admin/videosServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 * Fetches a single video by ID. Disabled until an ID is given.
 *   const { data: video, isLoading } = useVideoDetail(id)
 */
export function useVideoDetail(id) {
  return useQuery({
    queryKey: queryKeys.videos.detail(id),
    queryFn: () => getVideoDetailRequest({ id }),
    enabled: Boolean(id),
  })
}
