import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { deleteVideoRequest } from "@/services/admin/videosServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useDeleteVideo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteVideoRequest,
    onSuccess: () => {
      toast.success("Video deleted successfully!")
      queryClient.invalidateQueries({ queryKey: queryKeys.videos.all })
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to delete video.")
    },
  })
}

