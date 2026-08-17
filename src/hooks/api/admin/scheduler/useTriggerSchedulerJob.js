"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { triggerSchedulerJobRequest } from "@/services/admin/schedulerServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useTriggerSchedulerJob() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: triggerSchedulerJobRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.scheduler.all })
    },
  })
}
