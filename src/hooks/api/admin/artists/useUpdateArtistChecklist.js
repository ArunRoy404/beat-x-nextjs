"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateArtistChecklistRequest } from "@/services/admin/artistsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useUpdateArtistChecklist() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateArtistChecklistRequest,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.artists.all })
      if (variables?.id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.artists.detail(variables.id) })
      }
    },
  })
}
