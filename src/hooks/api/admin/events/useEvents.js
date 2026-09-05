"use client"

import { useQuery } from "@tanstack/react-query"
import { getEventsRequest } from "@/services/admin/eventsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useEvents(params) {
  return useQuery({
    queryKey: queryKeys.events.list(params),
    queryFn: () => getEventsRequest(params),
  })
}
