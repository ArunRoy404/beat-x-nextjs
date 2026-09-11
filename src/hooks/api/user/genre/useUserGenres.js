"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserGenresRequest } from "@/services/user/genreServices";
import { queryKeys } from "@/lib/reactQuery/queryKeys";

/**
 * Fetches platform genres for public/user discovery.
 */
export function useUserGenres() {
  return useQuery({
    queryKey: queryKeys.genre.list(),
    queryFn: getUserGenresRequest,
  });
}
