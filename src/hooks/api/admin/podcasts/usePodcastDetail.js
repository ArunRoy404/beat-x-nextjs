"use client"

import { useQuery } from "@tanstack/react-query"
import { getPodcastDetailRequest } from "@/services/admin/podcastsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 * Fetches a single podcast (with its episodes). Disabled until an id is given.
 *   const { data, isLoading } = usePodcastDetail(id) // data = { podcast, episodes }
 */
export function usePodcastDetail(id) {
  return useQuery({
    queryKey: queryKeys.podcasts.detail(id),
    queryFn: () => getPodcastDetailRequest({ id }),
    enabled: Boolean(id),
  })
}
