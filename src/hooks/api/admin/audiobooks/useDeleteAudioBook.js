"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteAudioBookRequest } from "@/services/admin/audioBooksServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 * Deletes an audiobook and refreshes every cached list on success.
 *   const { mutate: deleteAudioBook, isPending } = useDeleteAudioBook()
 *   deleteAudioBook({ id }, { onSuccess, onError })
 */
export function useDeleteAudioBook() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteAudioBookRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.audiobooks.all })
    },
  })
}
