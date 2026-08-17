"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAlbumRequest } from "@/services/admin/albumsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useCreateAlbum() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createAlbumRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.albums.all })
    },
  })
}
