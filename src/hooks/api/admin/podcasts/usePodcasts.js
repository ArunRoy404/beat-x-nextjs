"use client"

import { useQuery } from "@tanstack/react-query"
import { getPodcastsRequest } from "@/services/admin/podcastsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function usePodcasts(params) {
  return useQuery({
    queryKey: queryKeys.podcasts.list(params),
    queryFn: () => getPodcastsRequest(params),
  })
}
