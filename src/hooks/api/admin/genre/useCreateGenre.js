"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createGenreRequest } from "@/services/admin/genreServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 * Creates a genre and refreshes every cached genre list/search on success.
 *   const { mutate: createGenre, isPending } = useCreateGenre()
 *   createGenre({ name }, { onSuccess, onError })
 */
export function useCreateGenre() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createGenreRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.genre.all })
    },
  })
}
