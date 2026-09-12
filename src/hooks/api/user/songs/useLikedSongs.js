"use client";

import { useQuery } from "@tanstack/react-query";
import { getLikedSongsRequest } from "@/services/user/songsServices";
import { queryKeys } from "@/lib/reactQuery/queryKeys";

/**
 * Hook to fetch the signed-in user's collection of liked songs.
 * Supports optional pagination/query params.
 */
export function useLikedSongs(params) {
  return useQuery({
    queryKey: queryKeys.songs.liked(params),
    queryFn: () => getLikedSongsRequest(params),
  });
}
