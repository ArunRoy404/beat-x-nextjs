"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteReviewRequest } from "@/services/admin/podcastReviewsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useDeleteReview() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteReviewRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.podcastReviews.all })
    },
  })
}
