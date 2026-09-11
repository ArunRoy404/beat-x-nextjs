"use client";

import { useQuery } from "@tanstack/react-query";
import { getTrendingVideosRequest } from "@/services/user/videosServices";
import { queryKeys } from "@/lib/reactQuery/queryKeys";

/**
 * Hook to fetch trending platform videos.
 */
export function useTrendingVideos() {
  return useQuery({
    queryKey: queryKeys.videos.trending(),
    queryFn: getTrendingVideosRequest,
  });
}
