"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateEventRequest } from "@/services/admin/eventsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useUpdateEvent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ eventId, data }) => updateEventRequest(eventId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.events.all })
      await queryClient.refetchQueries({ queryKey: queryKeys.events.all })
    },
  })
}
