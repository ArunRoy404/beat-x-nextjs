"use client"

import { useQuery } from "@tanstack/react-query"
import { getGenresRequest } from "@/services/admin/genreServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 * Fetches the full admin genre list.
 *   const { data: genres = [], isLoading, isError, error, refetch } = useGenres()
 */
export function useGenres() {
  return useQuery({
    queryKey: queryKeys.genre.list(),
    queryFn: getGenresRequest,
  })
}
