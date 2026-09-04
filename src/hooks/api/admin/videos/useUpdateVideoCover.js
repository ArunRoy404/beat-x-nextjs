"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateVideoCoverRequest } from "@/services/admin/videosServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useUpdateVideoCover() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateVideoCoverRequest,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.videos.all })
      if (variables?.id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.videos.detail(variables.id) })
      }
    },
  })
}
