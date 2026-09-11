"use client";

import { useQuery } from "@tanstack/react-query";
import { getMyFavoritesRequest } from "@/services/user/profileServices";
import { queryKeys } from "@/lib/reactQuery/queryKeys";

/**
 * Hook to fetch user favorites (artists, genres, songs).
 */
export function useMyFavorites() {
  return useQuery({
    queryKey: queryKeys.user.favorites(),
    queryFn: getMyFavoritesRequest,
  });
}
