"use client";

import { useQuery } from "@tanstack/react-query";
import { getSongDetailRequest } from "@/services/user/songsServices";
import { queryKeys } from "@/lib/reactQuery/queryKeys";

/**
 * Reads detailed metadata for a single song by id.
 */
export function useSongDetail(id) {
  return useQuery({
    queryKey: queryKeys.songs.detail(id),
    queryFn: () => getSongDetailRequest(id),
    enabled: Boolean(id),
  });
}
