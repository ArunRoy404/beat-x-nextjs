"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { deleteAudiobookReviewRequest } from "@/services/admin/audiobookReviewsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useDeleteAudiobookReview() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteAudiobookReviewRequest,
    onSuccess: () => {
      toast.success("Review deleted successfully.")
      queryClient.invalidateQueries({ queryKey: queryKeys.audiobookReviews.all })
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to delete review.")
    },
  })
}
