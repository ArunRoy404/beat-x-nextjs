"use client";

import { useQuery } from "@tanstack/react-query";
import { getBrowseSongsRequest } from "@/services/user/songsServices";
import { queryKeys } from "@/lib/reactQuery/queryKeys";

/**
 * Hook to browse platform songs (e.g. for Top charts / Top 50).
 */
export function useBrowseSongs({ page = 1, limit = 50 } = {}) {
  return useQuery({
    queryKey: queryKeys.songs.list({ page, limit }),
    queryFn: () => getBrowseSongsRequest({ page, limit }),
  });
}
