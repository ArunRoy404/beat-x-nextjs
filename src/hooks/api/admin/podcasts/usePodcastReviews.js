"use client"

import { useQuery } from "@tanstack/react-query"
import { getPodcastReviewsRequest } from "@/services/admin/podcastReviewsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function usePodcastReviews(params) {
  return useQuery({
    queryKey: queryKeys.podcastReviews.list(params),
    queryFn: () => getPodcastReviewsRequest(params),
    enabled: Boolean(params?.podcastId),
  })
}
