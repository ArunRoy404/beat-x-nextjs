"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateVideoRequest } from "@/services/admin/videosServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useUpdateVideo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateVideoRequest,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.videos.all })
      if (variables?.id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.videos.detail(variables.id) })
      }
    },
  })
}
