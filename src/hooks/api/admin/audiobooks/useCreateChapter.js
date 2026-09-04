"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createChapterRequest } from "@/services/admin/audioBooksServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 * Uploads a new chapter. Resolves with { trackingId } — audio processing
 * finishes asynchronously server-side; the chapter's transcodeStatus will
 * update on its own via the periodic refetch, no progress tracking here.
 *   const { mutate: createChapter, isPending } = useCreateChapter()
 *   createChapter({ audiobookId, formData }, { onSuccess, onError })
 */
export function useCreateChapter() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createChapterRequest,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.audiobooks.all })
      if (variables?.audiobookId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.audiobooks.detail(variables.audiobookId) })
      }
    },
  })
}
