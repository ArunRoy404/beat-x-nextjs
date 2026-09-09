import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { rejectSongRequest } from "@/services/admin/songsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 * Rejects an artist-submitted song (PATCH /admin/songs/:id/reject with { reason }).
 */
export function useRejectSong() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: rejectSongRequest,
    onSuccess: (_data, variables) => {
      toast.success("Song submission rejected.")
      queryClient.invalidateQueries({ queryKey: queryKeys.music.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.music.detail(variables?.id) })
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to reject song submission.")
    },
  })
}

