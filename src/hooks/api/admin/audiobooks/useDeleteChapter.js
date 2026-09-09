import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { deleteChapterRequest } from "@/services/admin/audioBooksServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 * Deletes a chapter and refreshes the parent audiobook's detail query on success.
 *   const { mutate: deleteChapter, isPending } = useDeleteChapter()
 *   deleteChapter({ audiobookId, chapterId })
 */
export function useDeleteChapter() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteChapterRequest,
    onSuccess: (_data, variables) => {
      toast.success("Chapter deleted successfully.")
      queryClient.invalidateQueries({ queryKey: queryKeys.audiobooks.all })
      if (variables?.audiobookId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.audiobooks.detail(variables.audiobookId) })
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to delete chapter.")
    },
  })
}

