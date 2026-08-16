"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createSongRequest } from "@/services/admin/songsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 * Uploads a new song. Resolves immediately with { trackingId } — the audio
 * isn't fully processed until useUploadProgress(trackingId) reports status
 * "done", but the song record itself exists right away, so the caller can
 * invalidate the list as soon as this resolves.
 *   const { mutate: createSong, isPending } = useCreateSong()
 *   createSong(formData, { onSuccess, onError })
 */
export function useCreateSong() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createSongRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.music.all })
    },
  })
}
