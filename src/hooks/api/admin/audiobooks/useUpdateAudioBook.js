import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { updateAudioBookRequest } from "@/services/admin/audioBooksServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 * Updates an audiobook's metadata (PATCH /admin/audiobooks/:id)
 *   const { mutate: updateAudioBook, isPending } = useUpdateAudioBook()
 *   updateAudioBook({ id, data })
 */
export function useUpdateAudioBook() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateAudioBookRequest,
    onSuccess: (_data, variables) => {
      toast.success("Audiobook updated successfully!")
      queryClient.invalidateQueries({ queryKey: queryKeys.audiobooks.all })
      if (variables?.id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.audiobooks.detail(variables.id) })
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to update audiobook.")
    },
  })
}

