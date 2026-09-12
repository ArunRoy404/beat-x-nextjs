"use client";

import { useQuery } from "@tanstack/react-query";
import { getPlaylistDetailRequest } from "@/services/user/playlistsServices";
import { queryKeys } from "@/lib/reactQuery/queryKeys";

export function usePlaylistDetail(id, options = {}) {
  return useQuery({
    queryKey: queryKeys.playlists.detail(id),
    queryFn: () => getPlaylistDetailRequest(id),
    enabled: Boolean(id),
    ...options,
  });
}
