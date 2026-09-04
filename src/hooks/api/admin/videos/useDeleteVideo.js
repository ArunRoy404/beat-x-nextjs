"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteVideoRequest } from "@/services/admin/videosServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useDeleteVideo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteVideoRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.videos.all })
    },
  })
}
