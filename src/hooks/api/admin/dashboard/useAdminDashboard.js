"use client";

import { useQuery } from "@tanstack/react-query";
import { getAdminDashboardOverviewRequest } from "@/services/admin/dashboardServices";
import { queryKeys } from "@/lib/reactQuery/queryKeys";

/**
 * Fetches the admin dashboard overview metrics and lists.
 *   const { data, isLoading, isError } = useAdminDashboard()
 */
export function useAdminDashboard() {
  return useQuery({
    queryKey: queryKeys.dashboard.overview(),
    queryFn: getAdminDashboardOverviewRequest,
  });
}
