"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createSongRequest } from "@/services/admin/songsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 * Uploads a new song. Resolves immediately with { trackingId } — the song
 * record exists right away (audio processing finishes server-side after),
 * so the list is invalidated as soon as this resolves.
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
