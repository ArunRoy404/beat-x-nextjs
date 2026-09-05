"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateAudioBookRequest } from "@/services/admin/audioBooksServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 * Updates an audiobook's metadata (PATCH /admin/audiobooks/:id)
 *   const { mutate: updateAudioBook, isPending } = useUpdateAudioBook()
 *   updateAudioBook({ id, data }, { onSuccess, onError })
 */
export function useUpdateAudioBook() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateAudioBookRequest,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.audiobooks.all })
      if (variables?.id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.audiobooks.detail(variables.id) })
      }
    },
  })
}
