"use client";

import { useQuery } from "@tanstack/react-query";
import { getFeaturedAlbumsRequest } from "@/services/user/albumsServices";
import { queryKeys } from "@/lib/reactQuery/queryKeys";

/**
 * Hook to fetch featured / hot albums for discovery and trending.
 */
export function useFeaturedAlbums() {
  return useQuery({
    queryKey: queryKeys.albums.featured(),
    queryFn: getFeaturedAlbumsRequest,
  });
}
