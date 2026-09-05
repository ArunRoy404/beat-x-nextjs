"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { reviewMediaAssetsRequest } from "@/services/admin/artistsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useReviewMediaAssets() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: reviewMediaAssetsRequest,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.artists.all })
      if (variables?.id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.artists.detail(variables.id) })
      }
    },
  })
}
