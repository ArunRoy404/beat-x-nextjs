"use client"

import { useQuery } from "@tanstack/react-query"
import { getArtistDetailRequest } from "@/services/admin/artistsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useArtistDetail(id) {
  return useQuery({
    queryKey: queryKeys.artists.detail(id),
    queryFn: () => getArtistDetailRequest({ id }),
    enabled: Boolean(id),
  })
}
