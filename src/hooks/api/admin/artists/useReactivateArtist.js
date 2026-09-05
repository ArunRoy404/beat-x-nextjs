"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { reactivateArtistRequest } from "@/services/admin/artistsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useReactivateArtist() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: reactivateArtistRequest,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.artists.all })
      if (variables?.id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.artists.detail(variables.id) })
      }
    },
  })
}
