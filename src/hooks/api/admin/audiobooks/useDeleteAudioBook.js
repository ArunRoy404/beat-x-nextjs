import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { deleteAudioBookRequest } from "@/services/admin/audioBooksServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 * Deletes an audiobook and refreshes every cached list on success.
 *   const { mutate: deleteAudioBook, isPending } = useDeleteAudioBook()
 *   deleteAudioBook({ id })
 */
export function useDeleteAudioBook() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteAudioBookRequest,
    onSuccess: () => {
      toast.success("Audiobook deleted successfully!")
      queryClient.invalidateQueries({ queryKey: queryKeys.audiobooks.all })
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to delete audiobook.")
    },
  })
}

