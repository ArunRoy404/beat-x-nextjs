"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updatePodcastRequest } from "@/services/admin/podcastsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useUpdatePodcast() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updatePodcastRequest,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.podcasts.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.podcasts.detail(variables.id) })
    },
  })
}
