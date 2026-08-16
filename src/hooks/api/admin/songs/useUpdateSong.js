"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateSongRequest } from "@/services/admin/songsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 * Updates a song. When a new audio file is included this behaves like
 * create (async, resolves with a trackingId to watch via useUploadProgress)
 * — check `result?.trackingId` before assuming the update is complete.
 *   const { mutate: updateSong, isPending } = useUpdateSong()
 *   updateSong({ id, formData }, { onSuccess, onError })
 */
export function useUpdateSong() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateSongRequest,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.music.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.music.detail(variables.id) })
    },
  })
}
