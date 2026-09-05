"use client"

import { useQuery } from "@tanstack/react-query"
import { getArtistsRequest } from "@/services/admin/artistsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useArtists(params) {
  return useQuery({
    queryKey: queryKeys.artists.list(params),
    queryFn: () => getArtistsRequest(params),
  })
}
