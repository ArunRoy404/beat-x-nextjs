import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { deletePodcastRequest } from "@/services/admin/podcastsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useDeletePodcast() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deletePodcastRequest,
    onSuccess: () => {
      toast.success("Podcast deleted successfully!")
      queryClient.invalidateQueries({ queryKey: queryKeys.podcasts.all })
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to delete podcast.")
    },
  })
}

