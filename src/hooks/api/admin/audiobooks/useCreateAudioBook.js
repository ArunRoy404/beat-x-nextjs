"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAudioBookRequest } from "@/services/admin/audioBooksServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 * Creates an audiobook and refreshes every cached list on success.
 *   const { mutate: createAudioBook, isPending } = useCreateAudioBook()
 *   createAudioBook(formData, { onSuccess, onError })
 */
export function useCreateAudioBook() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createAudioBookRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.audiobooks.all })
    },
  })
}
