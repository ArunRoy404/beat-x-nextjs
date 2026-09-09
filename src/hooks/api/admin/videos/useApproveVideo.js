import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { approveVideoRequest } from "@/services/admin/videosServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useApproveVideo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: approveVideoRequest,
    onSuccess: (_data, variables) => {
      toast.success("Video submission approved!")
      queryClient.invalidateQueries({ queryKey: queryKeys.videos.all })
      if (variables?.id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.videos.detail(variables.id) })
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to approve video.")
    },
  })
}

