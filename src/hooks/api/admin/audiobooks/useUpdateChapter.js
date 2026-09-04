"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateChapterRequest } from "@/services/admin/audioBooksServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 * Updates a chapter. When a new audio file is included, processing happens
 * asynchronously server-side; transcodeStatus updates on its own via the
 * periodic refetch, no progress tracking here.
 *   const { mutate: updateChapter, isPending } = useUpdateChapter()
 *   updateChapter({ audiobookId, chapterId, formData }, { onSuccess, onError })
 */
export function useUpdateChapter() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateChapterRequest,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.audiobooks.all })
      if (variables?.audiobookId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.audiobooks.detail(variables.audiobookId) })
      }
    },
  })
}
