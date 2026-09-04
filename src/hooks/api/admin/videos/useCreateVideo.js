"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createVideoRequest } from "@/services/admin/videosServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useCreateVideo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createVideoRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.videos.all })
    },
  })
}
