"use client"

import { useQuery } from "@tanstack/react-query"
import { getAlbumsRequest } from "@/services/admin/albumsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useAlbums(params) {
  return useQuery({
    queryKey: queryKeys.albums.list(params),
    queryFn: () => getAlbumsRequest(params),
  })
}
