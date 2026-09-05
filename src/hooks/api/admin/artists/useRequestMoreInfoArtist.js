"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { requestMoreInfoArtistRequest } from "@/services/admin/artistsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useRequestMoreInfoArtist() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: requestMoreInfoArtistRequest,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.artists.all })
      if (variables?.id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.artists.detail(variables.id) })
      }
    },
  })
}
