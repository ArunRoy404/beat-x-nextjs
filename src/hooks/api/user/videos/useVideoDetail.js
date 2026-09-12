"use client";

import { useQuery } from "@tanstack/react-query";
import { getVideoDetailRequest } from "@/services/user/videosServices";
import { queryKeys } from "@/lib/reactQuery/queryKeys";

/**
 * Fetches single video detail for user role, including isLiked status.
 */
export function useVideoDetail(id) {
  return useQuery({
    queryKey: queryKeys.videos.detail(id),
    queryFn: () => getVideoDetailRequest(id),
    enabled: Boolean(id),
  });
}
