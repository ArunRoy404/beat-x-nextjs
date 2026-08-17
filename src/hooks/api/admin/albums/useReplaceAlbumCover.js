"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { replaceAlbumCoverRequest } from "@/services/admin/albumsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useReplaceAlbumCover() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: replaceAlbumCoverRequest,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.albums.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.albums.detail(variables.id) })
    },
  })
}
