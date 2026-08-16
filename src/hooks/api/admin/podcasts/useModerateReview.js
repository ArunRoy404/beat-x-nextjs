"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { moderateReviewRequest } from "@/services/admin/podcastReviewsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useModerateReview() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: moderateReviewRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.podcastReviews.all })
    },
  })
}
