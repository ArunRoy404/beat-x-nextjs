"use client"

import { useQuery } from "@tanstack/react-query"
import { getAlbumDetailRequest } from "@/services/admin/albumsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 * Fetches a single album (with its songs). Disabled until an id is given.
 *   const { data, isLoading } = useAlbumDetail(id) // data = { album, songs }
 */
export function useAlbumDetail(id) {
  return useQuery({
    queryKey: queryKeys.albums.detail(id),
    queryFn: () => getAlbumDetailRequest({ id }),
    enabled: Boolean(id),
  })
}
