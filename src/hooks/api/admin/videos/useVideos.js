"use client"

import { useQuery } from "@tanstack/react-query"
import { getVideosRequest } from "@/services/admin/videosServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 * Custom TanStack Query hook for fetching the paginated admin videos list.
 *   const { data, isLoading, refetch } = useVideos(params)
 */
export function useVideos(params = {}) {
  return useQuery({
    queryKey: queryKeys.videos.list(params),
    queryFn: () => getVideosRequest(params),
  })
}
