"use client";

import { useQuery } from "@tanstack/react-query";
import { getSongsHomeRequest } from "@/services/user/songsServices";
import { queryKeys } from "@/lib/reactQuery/queryKeys";

/**
 * Reads the composite user home feed.
 *   const { data: homeData, isLoading, isError, refetch } = useSongsHome()
 *   data => { featured, trending, newReleases, topCategories, dailyDiscovery, onRepeat, recentlyPlayed }
 */
export function useSongsHome() {
  return useQuery({
    queryKey: queryKeys.songs.home(),
    queryFn: getSongsHomeRequest,
  });
}
