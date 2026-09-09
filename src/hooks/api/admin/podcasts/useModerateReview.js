import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { moderateReviewRequest } from "@/services/admin/podcastReviewsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useModerateReview() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: moderateReviewRequest,
    onSuccess: () => {
      toast.success("Review updated successfully.")
      queryClient.invalidateQueries({ queryKey: queryKeys.podcastReviews.all })
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to update review.")
    },
  })
}

