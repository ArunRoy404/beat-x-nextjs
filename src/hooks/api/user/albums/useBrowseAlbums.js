"use client";

import { useQuery } from "@tanstack/react-query";
import { getBrowseAlbumsRequest } from "@/services/user/albumsServices";
import { queryKeys } from "@/lib/reactQuery/queryKeys";

/**
 * Hook to fetch paginated albums catalog.
 */
export function useBrowseAlbums({ page = 1, limit = 20 } = {}) {
  return useQuery({
    queryKey: queryKeys.albums.list({ page, limit }),
    queryFn: () => getBrowseAlbumsRequest({ page, limit }),
  });
}
