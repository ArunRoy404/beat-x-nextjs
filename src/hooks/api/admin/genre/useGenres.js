"use client";

import { useQuery } from "@tanstack/react-query";
import { getGenresRequest } from "@/services/admin/genreServices";
import { queryKeys } from "@/lib/reactQuery/queryKeys";

/**
 * Fetches the paginated admin genre list.
 *   const { data, isLoading, isError, error, refetch } = useGenres(params)
 */
export function useGenres(params) {
  return useQuery({
    queryKey: queryKeys.genre.list(params),
    queryFn: () => getGenresRequest(params),
  });
}
