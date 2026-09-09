import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { rejectPodcastRequest } from "@/services/admin/podcastsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useRejectPodcast() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: rejectPodcastRequest,
    onSuccess: (_data, variables) => {
      toast.success("Podcast submission rejected.")
      queryClient.invalidateQueries({ queryKey: queryKeys.podcasts.all })
      if (variables?.id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.podcasts.detail(variables.id) })
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to reject podcast submission.")
    },
  })
}

