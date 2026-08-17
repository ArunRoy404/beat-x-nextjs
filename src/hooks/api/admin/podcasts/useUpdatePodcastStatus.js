"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updatePodcastStatusRequest } from "@/services/admin/podcastsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 * Take Down / Restore — a status-only PATCH against the same update route.
 *   const { mutate: updatePodcastStatus, isPending } = useUpdatePodcastStatus()
 *   updatePodcastStatus({ id, status: "archived" }, { onSuccess, onError })
 */
export function useUpdatePodcastStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updatePodcastStatusRequest,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.podcasts.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.podcasts.detail(variables.id) })
    },
  })
}
