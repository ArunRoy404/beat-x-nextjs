import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { updateVideoRequest } from "@/services/admin/videosServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useUpdateVideo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateVideoRequest,
    onSuccess: (_data, variables) => {
      if (variables?.body?.status === "archived") {
        toast.success("Video taken down.")
      } else if (variables?.body?.status === "active") {
        toast.success("Video restored.")
      } else {
        toast.success("Video changes saved successfully!")
      }
      queryClient.invalidateQueries({ queryKey: queryKeys.videos.all })
      if (variables?.id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.videos.detail(variables.id) })
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to update video.")
    },
  })
}

