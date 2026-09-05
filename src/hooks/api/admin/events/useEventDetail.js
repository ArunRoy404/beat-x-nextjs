"use client"

import { useQuery } from "@tanstack/react-query"
import { getEventDetailRequest } from "@/services/admin/eventsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useEventDetail(eventId) {
  return useQuery({
    queryKey: queryKeys.events.detail(eventId),
    queryFn: () => getEventDetailRequest(eventId),
    enabled: Boolean(eventId),
  })
}
