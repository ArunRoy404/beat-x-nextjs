"use client"

import { useMutation } from "@tanstack/react-query"
import { createChapterRequest } from "@/services/admin/audioBooksServices"

/**
 * Uploads a new chapter. Resolves immediately with { trackingId } — the
 * chapter isn't actually ready until useUploadProgress(trackingId) reports
 * status "done", so the caller invalidates the audiobook detail query then,
 * not here.
 *   const { mutate: createChapter, isPending } = useCreateChapter()
 *   createChapter({ audiobookId, formData }, { onSuccess, onError })
 */
export function useCreateChapter() {
  return useMutation({
    mutationFn: createChapterRequest,
  })
}
