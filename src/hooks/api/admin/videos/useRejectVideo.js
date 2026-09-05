"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { rejectVideoRequest } from "@/services/admin/videosServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useRejectVideo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: rejectVideoRequest,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.videos.all })
      if (variables?.id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.videos.detail(variables.id) })
      }
    },
  })
}
