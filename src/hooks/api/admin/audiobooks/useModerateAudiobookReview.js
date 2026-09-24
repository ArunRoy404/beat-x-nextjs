"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { moderateAudiobookReviewRequest } from "@/services/admin/audiobookReviewsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useModerateAudiobookReview() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: moderateAudiobookReviewRequest,
    onSuccess: () => {
      toast.success("Review updated successfully.")
      queryClient.invalidateQueries({ queryKey: queryKeys.audiobookReviews.all })
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to update review.")
    },
  })
}
