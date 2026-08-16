"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateSongStatusRequest } from "@/services/admin/songsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 * Take Down / Restore — a status-only PATCH against the same update route.
 *   const { mutate: updateSongStatus, isPending } = useUpdateSongStatus()
 *   updateSongStatus({ id, status: "archived" }, { onSuccess, onError })
 */
export function useUpdateSongStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateSongStatusRequest,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.music.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.music.detail(variables.id) })
    },
  })
}
