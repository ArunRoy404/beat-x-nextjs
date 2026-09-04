"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { approvePodcastRequest } from "@/services/admin/podcastsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useApprovePodcast() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: approvePodcastRequest,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.podcasts.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.podcasts.detail(variables.id) })
    },
  })
}
