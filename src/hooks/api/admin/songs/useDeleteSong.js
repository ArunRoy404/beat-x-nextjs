"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteSongRequest } from "@/services/admin/songsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 * Deletes a song and refreshes every cached list on success.
 *   const { mutate: deleteSong, isPending } = useDeleteSong()
 *   deleteSong({ id }, { onSuccess, onError })
 */
export function useDeleteSong() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteSongRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.music.all })
    },
  })
}
