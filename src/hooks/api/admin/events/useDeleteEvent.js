"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { deleteEventRequest } from "@/services/admin/eventsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useDeleteEvent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (eventId) => deleteEventRequest(eventId),
    onSuccess: async () => {
      toast.success("Event deleted successfully!")
      await queryClient.invalidateQueries({ queryKey: queryKeys.events.all })
      await queryClient.refetchQueries({ queryKey: queryKeys.events.all })
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to delete event")
    },
  })
}
