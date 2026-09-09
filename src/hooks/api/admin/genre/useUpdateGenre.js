"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { updateGenreRequest } from "@/services/admin/genreServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 * Updates a genre and refreshes every cached genre list/search on success.
 *   const { mutate: updateGenre, isPending } = useUpdateGenre()
 *   updateGenre({ id, name })
 */
export function useUpdateGenre() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateGenreRequest,
    onSuccess: () => {
      toast.success("Genre updated successfully!")
      queryClient.invalidateQueries({ queryKey: queryKeys.genre.all })
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to update genre.")
    },
  })
}

