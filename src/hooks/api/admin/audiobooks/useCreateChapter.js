import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { createChapterRequest } from "@/services/admin/audioBooksServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 * Uploads a new chapter. Resolves with { trackingId } — audio processing
 * finishes asynchronously server-side; the chapter's transcodeStatus will
 * update on its own via the periodic refetch, no progress tracking here.
 *   const { mutate: createChapter, isPending } = useCreateChapter()
 *   createChapter({ audiobookId, formData })
 */
export function useCreateChapter() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createChapterRequest,
    onSuccess: (_data, variables) => {
      toast.success("Chapter uploaded — processing audio now.")
      queryClient.invalidateQueries({ queryKey: queryKeys.audiobooks.all })
      if (variables?.audiobookId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.audiobooks.detail(variables.audiobookId) })
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to upload chapter.")
    },
  })
}

