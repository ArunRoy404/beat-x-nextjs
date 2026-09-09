import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { approveSongRequest } from "@/services/admin/songsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 * Approves an artist-submitted song (PATCH /admin/songs/:id/approve).
 */
export function useApproveSong() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: approveSongRequest,
    onSuccess: (_data, variables) => {
      toast.success("Song submission approved!")
      queryClient.invalidateQueries({ queryKey: queryKeys.music.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.music.detail(variables?.id) })
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to approve song.")
    },
  })
}

