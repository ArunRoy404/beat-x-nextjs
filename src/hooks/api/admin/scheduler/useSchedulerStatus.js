"use client"

import { useQuery } from "@tanstack/react-query"
import { getSchedulerStatusRequest } from "@/services/admin/schedulerServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useSchedulerStatus() {
  return useQuery({
    queryKey: queryKeys.scheduler.status(),
    queryFn: getSchedulerStatusRequest,
  })
}
