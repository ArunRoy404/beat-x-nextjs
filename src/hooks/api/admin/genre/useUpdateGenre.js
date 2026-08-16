"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateGenreRequest } from "@/services/admin/genreServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 * Updates a genre and refreshes every cached genre list/search on success.
 *   const { mutate: updateGenre, isPending } = useUpdateGenre()
 *   updateGenre({ id, name }, { onSuccess, onError })
 */
export function useUpdateGenre() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateGenreRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.genre.all })
    },
  })
}
