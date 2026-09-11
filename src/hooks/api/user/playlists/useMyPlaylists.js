"use client";

import { useQuery } from "@tanstack/react-query";
import { getMyPlaylistsRequest } from "@/services/user/playlistsServices";
import { queryKeys } from "@/lib/reactQuery/queryKeys";

/**
 * Hook to fetch the current user's created and saved playlists.
 */
export function useMyPlaylists({ page = 1, limit = 20 } = {}) {
  return useQuery({
    queryKey: queryKeys.playlists.mine({ page, limit }),
    queryFn: () => getMyPlaylistsRequest({ page, limit }),
  });
}
