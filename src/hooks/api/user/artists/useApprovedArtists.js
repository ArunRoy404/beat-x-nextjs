"use client";

import { useQuery } from "@tanstack/react-query";
import { getApprovedArtistsRequest } from "@/services/user/artistsServices";
import { queryKeys } from "@/lib/reactQuery/queryKeys";

/**
 * Fetches approved platform artists.
 *   const { data: artists, isLoading, isError, refetch } = useApprovedArtists()
 *   data => ApprovedArtistResponseDto[]
 */
export function useApprovedArtists() {
  return useQuery({
    queryKey: queryKeys.user.artists(),
    queryFn: getApprovedArtistsRequest,
  });
}
