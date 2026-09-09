import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { updateAudioBookCoverRequest } from "@/services/admin/audioBooksServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 * Updates an audiobook's cover image (PATCH /admin/audiobooks/:id/cover)
 *   const { mutate: updateAudioBookCover, isPending } = useUpdateAudioBookCover()
 *   updateAudioBookCover({ id, file })
 */
export function useUpdateAudioBookCover() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateAudioBookCoverRequest,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.audiobooks.all })
      if (variables?.id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.audiobooks.detail(variables.id) })
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to update audiobook cover.")
    },
  })
}

