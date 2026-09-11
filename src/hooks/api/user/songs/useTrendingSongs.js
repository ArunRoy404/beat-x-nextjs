"use client";

import { useQuery } from "@tanstack/react-query";
import { getTrendingSongsRequest } from "@/services/user/songsServices";
import { queryKeys } from "@/lib/reactQuery/queryKeys";

/**
 * Hook to fetch trending platform songs.
 */
export function useTrendingSongs() {
  return useQuery({
    queryKey: queryKeys.songs.trending(),
    queryFn: getTrendingSongsRequest,
  });
}
