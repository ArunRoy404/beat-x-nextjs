"use client"

import { useQuery } from "@tanstack/react-query"
import { getEventAnalyticsRequest } from "@/services/admin/eventsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useEventAnalytics(eventId) {
  return useQuery({
    queryKey: queryKeys.events.detail(eventId),
    queryFn: () => getEventAnalyticsRequest(eventId),
    enabled: Boolean(eventId),
  })
}
