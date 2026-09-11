"use client";

import { useQuery } from "@tanstack/react-query";
import { getFeaturedSongsRequest } from "@/services/user/songsServices";
import { queryKeys } from "@/lib/reactQuery/queryKeys";

/**
 * Fetches featured platform songs for hero banners and spotlights.
 */
export function useFeaturedSongs() {
  return useQuery({
    queryKey: queryKeys.songs.featured(),
    queryFn: getFeaturedSongsRequest,
  });
}
