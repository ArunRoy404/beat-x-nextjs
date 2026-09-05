"use client"

import { useQuery } from "@tanstack/react-query"
import { getEventsDashboardStatsRequest } from "@/services/admin/eventsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useEventsDashboardStats() {
  return useQuery({
    queryKey: queryKeys.events.dashboard(),
    queryFn: () => getEventsDashboardStatsRequest(),
  })
}
