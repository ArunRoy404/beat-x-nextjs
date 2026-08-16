"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteGenreRequest } from "@/services/admin/genreServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 * Deletes a genre and refreshes every cached genre list/search on success.
 *   const { mutate: deleteGenre, isPending } = useDeleteGenre()
 *   deleteGenre({ id }, { onSuccess, onError })
 */
export function useDeleteGenre() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteGenreRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.genre.all })
    },
  })
}
