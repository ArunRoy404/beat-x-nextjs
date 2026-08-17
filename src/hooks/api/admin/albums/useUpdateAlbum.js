"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateAlbumRequest } from "@/services/admin/albumsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useUpdateAlbum() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateAlbumRequest,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.albums.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.albums.detail(variables.id) })
    },
  })
}
