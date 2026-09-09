import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { updatePodcastStatusRequest } from "@/services/admin/podcastsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 * Take Down / Restore — a status-only PATCH against the same update route.
 *   const { mutate: updatePodcastStatus, isPending } = useUpdatePodcastStatus()
 *   updatePodcastStatus({ id, status: "archived" })
 */
export function useUpdatePodcastStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updatePodcastStatusRequest,
    onSuccess: (_data, variables) => {
      toast.success(variables?.status === "archived" ? "Podcast taken down." : "Podcast restored.")
      queryClient.invalidateQueries({ queryKey: queryKeys.podcasts.all })
      if (variables?.id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.podcasts.detail(variables.id) })
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to update podcast status.")
    },
  })
}

