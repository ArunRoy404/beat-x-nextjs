"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { deleteGenreRequest } from "@/services/admin/genreServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 * Deletes a genre and refreshes every cached genre list/search on success.
 *   const { mutate: deleteGenre, isPending } = useDeleteGenre()
 *   deleteGenre({ id })
 */
export function useDeleteGenre() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteGenreRequest,
    onSuccess: () => {
      toast.success("Genre deleted successfully!")
      queryClient.invalidateQueries({ queryKey: queryKeys.genre.all })
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to delete genre.")
    },
  })
}

