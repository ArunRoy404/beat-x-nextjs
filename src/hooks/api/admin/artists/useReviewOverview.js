import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { reviewOverviewRequest } from "@/services/admin/artistsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useReviewOverview() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: reviewOverviewRequest,
    onSuccess: (_data, variables) => {
      toast.success("Overview tab marked as reviewed.")
      queryClient.invalidateQueries({ queryKey: queryKeys.artists.all })
      if (variables?.id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.artists.detail(variables.id) })
      }
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || err?.message || "Failed to mark overview reviewed.")
    },
  })
}

