"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteAlbumRequest } from "@/services/admin/albumsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useDeleteAlbum() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteAlbumRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.albums.all })
    },
  })
}
