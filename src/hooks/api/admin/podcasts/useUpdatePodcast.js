import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { updatePodcastRequest } from "@/services/admin/podcastsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useUpdatePodcast() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updatePodcastRequest,
    onSuccess: (_data, variables) => {
      toast.success("Podcast updated successfully!")
      queryClient.invalidateQueries({ queryKey: queryKeys.podcasts.all })
      if (variables?.id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.podcasts.detail(variables.id) })
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to update podcast.")
    },
  })
}

