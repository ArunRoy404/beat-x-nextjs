import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { triggerSchedulerJobRequest } from "@/services/admin/schedulerServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useTriggerSchedulerJob() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: triggerSchedulerJobRequest,
    onSuccess: () => {
      toast.success("Scheduled-publish check triggered.")
      queryClient.invalidateQueries({ queryKey: queryKeys.scheduler.all })
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to trigger scheduler job.")
    },
  })
}

