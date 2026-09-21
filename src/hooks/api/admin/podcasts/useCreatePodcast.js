import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { createPodcastRequest } from "@/services/admin/podcastsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 *   const { mutate: createPodcast, isPending } = useCreatePodcast()
 *   createPodcast(formData)
 */
export function useCreatePodcast() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createPodcastRequest,
    onSuccess: () => {
      toast.success("Podcast created successfully!")
      queryClient.invalidateQueries({ queryKey: queryKeys.podcasts.all })
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to create podcast.")
    },
  })
}
