"use client";

import { useQuery } from "@tanstack/react-query";
import { getLikedSongsRequest } from "@/services/user/songsServices";
import { queryKeys } from "@/lib/reactQuery/queryKeys";

/**
 * Hook to fetch the signed-in user's collection of liked songs.
 */
export function useLikedSongs() {
  return useQuery({
    queryKey: queryKeys.songs.liked(),
    queryFn: getLikedSongsRequest,
  });
}
