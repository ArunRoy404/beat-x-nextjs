"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { createEventRequest } from "@/services/admin/eventsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useCreateEvent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createEventRequest,
    onSuccess: async () => {
      toast.success("Event created successfully!")
      await queryClient.invalidateQueries({ queryKey: queryKeys.events.all })
      await queryClient.refetchQueries({ queryKey: queryKeys.events.all })
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to create event")
    },
  })
}
