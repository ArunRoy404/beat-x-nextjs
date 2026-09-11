"use client";

import { useQuery } from "@tanstack/react-query";
import { getNewReleaseAlbumsRequest } from "@/services/user/albumsServices";
import { queryKeys } from "@/lib/reactQuery/queryKeys";

/**
 * Hook to fetch recent/new release platform albums for the library.
 */
export function useNewReleaseAlbums({ page = 1, limit = 20 } = {}) {
  return useQuery({
    queryKey: queryKeys.albums.newReleases({ page, limit }),
    queryFn: () => getNewReleaseAlbumsRequest({ page, limit }),
  });
}
