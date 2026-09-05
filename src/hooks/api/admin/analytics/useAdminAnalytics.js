"use client";

import { useQuery } from "@tanstack/react-query";
import { getAdminAnalyticsRequest } from "@/services/admin/analyticsServices";
import { queryKeys } from "@/lib/reactQuery/queryKeys";

/**
 * Fetches admin analytics metrics for a given time range (7d, 30d, 3m, 6m, 1y).
 *   const { data, isLoading, isError } = useAdminAnalytics({ range: "7d" })
 */
export function useAdminAnalytics(params) {
  return useQuery({
    queryKey: queryKeys.analytics.detail(params),
    queryFn: () => getAdminAnalyticsRequest(params),
  });
}
