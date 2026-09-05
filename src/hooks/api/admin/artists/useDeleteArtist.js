"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteArtistRequest } from "@/services/admin/artistsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useDeleteArtist() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteArtistRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.artists.all })
    },
  })
}
