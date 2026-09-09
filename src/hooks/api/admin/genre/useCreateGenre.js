"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { createGenreRequest } from "@/services/admin/genreServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 * Creates a genre and refreshes every cached genre list/search on success.
 *   const { mutate: createGenre, isPending } = useCreateGenre()
 *   createGenre({ name })
 */
export function useCreateGenre() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createGenreRequest,
    onSuccess: () => {
      toast.success("Genre added successfully!")
      queryClient.invalidateQueries({ queryKey: queryKeys.genre.all })
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to add genre.")
    },
  })
}

