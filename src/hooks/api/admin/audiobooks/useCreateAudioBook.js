import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { createAudioBookRequest } from "@/services/admin/audioBooksServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 * Creates an audiobook and refreshes every cached list on success.
 *   const { mutate: createAudioBook, isPending } = useCreateAudioBook()
 *   createAudioBook(formData)
 */
export function useCreateAudioBook() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createAudioBookRequest,
    onSuccess: () => {
      toast.success("Audiobook created successfully!")
      queryClient.invalidateQueries({ queryKey: queryKeys.audiobooks.all })
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to create audiobook.")
    },
  })
}

