"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteEventRequest } from "@/services/admin/eventsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useDeleteEvent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (eventId) => deleteEventRequest(eventId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.events.all })
      await queryClient.refetchQueries({ queryKey: queryKeys.events.all })
    },
  })
}
