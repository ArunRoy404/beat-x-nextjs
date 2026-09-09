import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { createVideoRequest } from "@/services/admin/videosServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useCreateVideo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createVideoRequest,
    onSuccess: () => {
      toast.success("Video uploaded successfully! Processing video now.")
      queryClient.invalidateQueries({ queryKey: queryKeys.videos.all })
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to upload video.")
    },
  })
}

