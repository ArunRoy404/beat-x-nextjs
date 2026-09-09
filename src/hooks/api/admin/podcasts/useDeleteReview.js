import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { deleteReviewRequest } from "@/services/admin/podcastReviewsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useDeleteReview() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteReviewRequest,
    onSuccess: () => {
      toast.success("Review deleted successfully.")
      queryClient.invalidateQueries({ queryKey: queryKeys.podcastReviews.all })
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to delete review.")
    },
  })
}

