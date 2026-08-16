"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deletePodcastRequest } from "@/services/admin/podcastsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useDeletePodcast() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deletePodcastRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.podcasts.all })
    },
  })
}
