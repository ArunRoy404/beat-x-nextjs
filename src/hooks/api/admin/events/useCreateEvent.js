"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createEventRequest } from "@/services/admin/eventsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useCreateEvent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createEventRequest,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.events.all })
      await queryClient.refetchQueries({ queryKey: queryKeys.events.all })
    },
  })
}
