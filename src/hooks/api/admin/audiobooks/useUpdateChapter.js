import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { updateChapterRequest } from "@/services/admin/audioBooksServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 * Updates a chapter. When a new audio file is included, processing happens
 * asynchronously server-side; transcodeStatus updates on its own via the
 * periodic refetch, no progress tracking here.
 *   const { mutate: updateChapter, isPending } = useUpdateChapter()
 *   updateChapter({ audiobookId, chapterId, formData })
 */
export function useUpdateChapter() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateChapterRequest,
    onSuccess: (_data, variables) => {
      toast.success("Chapter updated successfully!")
      queryClient.invalidateQueries({ queryKey: queryKeys.audiobooks.all })
      if (variables?.audiobookId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.audiobooks.detail(variables.audiobookId) })
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to update chapter.")
    },
  })
}

