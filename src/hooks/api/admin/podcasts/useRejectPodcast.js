"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { rejectPodcastRequest } from "@/services/admin/podcastsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useRejectPodcast() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: rejectPodcastRequest,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.podcasts.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.podcasts.detail(variables.id) })
    },
  })
}
