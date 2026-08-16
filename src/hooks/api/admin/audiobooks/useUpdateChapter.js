"use client"

import { useMutation } from "@tanstack/react-query"
import { updateChapterRequest } from "@/services/admin/audioBooksServices"

/**
 * Updates a chapter. When a new audio file is included this behaves like
 * create (async, resolves with a trackingId to watch via useUploadProgress)
 * — the caller invalidates the audiobook detail query once processing
 * finishes, not here. For text-only edits it applies immediately.
 *   const { mutate: updateChapter, isPending } = useUpdateChapter()
 *   updateChapter({ audiobookId, chapterId, formData }, { onSuccess, onError })
 */
export function useUpdateChapter() {
  return useMutation({
    mutationFn: updateChapterRequest,
  })
}
