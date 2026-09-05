"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { approveArtistRequest } from "@/services/admin/artistsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useApproveArtist() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: approveArtistRequest,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.artists.all })
      if (variables?.id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.artists.detail(variables.id) })
      }
    },
  })
}
