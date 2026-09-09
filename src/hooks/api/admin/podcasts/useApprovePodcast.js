import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { approvePodcastRequest } from "@/services/admin/podcastsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useApprovePodcast() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: approvePodcastRequest,
    onSuccess: (_data, variables) => {
      toast.success("Podcast approved!")
      queryClient.invalidateQueries({ queryKey: queryKeys.podcasts.all })
      if (variables?.id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.podcasts.detail(variables.id) })
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to approve podcast.")
    },
  })
}

