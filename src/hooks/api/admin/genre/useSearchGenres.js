"use client"

import { useQuery } from "@tanstack/react-query"
import { searchGenresRequest } from "@/services/admin/genreServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 * Searches genres by name via GET /genre/search?name=. Disabled until a
 * non-empty name is given.
 *   const { data: results = [], isLoading } = useSearchGenres(name)
 */
export function useSearchGenres(name) {
  return useQuery({
    queryKey: queryKeys.genre.search(name),
    queryFn: () => searchGenresRequest({ name }),
    enabled: Boolean(name),
  })
}
