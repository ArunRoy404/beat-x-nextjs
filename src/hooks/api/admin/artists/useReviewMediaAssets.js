import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { reviewMediaAssetsRequest } from "@/services/admin/artistsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useReviewMediaAssets() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: reviewMediaAssetsRequest,
    onSuccess: (_data, variables) => {
      toast.success("Media assets tab marked as reviewed.")
      queryClient.invalidateQueries({ queryKey: queryKeys.artists.all })
      if (variables?.id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.artists.detail(variables.id) })
      }
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || err?.message || "Failed to mark media assets reviewed.")
    },
  })
}

