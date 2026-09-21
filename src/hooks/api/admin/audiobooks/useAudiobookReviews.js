"use client"

import { useQuery } from "@tanstack/react-query"
import { getAudiobookReviewsRequest } from "@/services/admin/audiobookReviewsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useAudiobookReviews(params) {
  return useQuery({
    queryKey: queryKeys.audiobookReviews.list(params),
    queryFn: () => getAudiobookReviewsRequest(params),
    enabled: Boolean(params?.audiobookId),
  })
}
