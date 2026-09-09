"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { updateEventRequest } from "@/services/admin/eventsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useUpdateEvent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ eventId, data }) => updateEventRequest(eventId, data),
    onSuccess: async (_data, variables) => {
      toast.success("Event updated successfully!")
      await queryClient.invalidateQueries({ queryKey: queryKeys.events.all })
      await queryClient.invalidateQueries({ queryKey: queryKeys.events.detail(variables?.eventId) })
      await queryClient.refetchQueries({ queryKey: queryKeys.events.all })
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to update event")
    },
  })
}
