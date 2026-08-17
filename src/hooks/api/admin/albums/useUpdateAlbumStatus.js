"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateAlbumStatusRequest } from "@/services/admin/albumsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 * Take Down / Restore — a status-only PATCH against the same update route.
 *   const { mutate: updateAlbumStatus, isPending } = useUpdateAlbumStatus()
 *   updateAlbumStatus({ id, status: "archived" }, { onSuccess, onError })
 */
export function useUpdateAlbumStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateAlbumStatusRequest,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.albums.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.albums.detail(variables.id) })
    },
  })
}
