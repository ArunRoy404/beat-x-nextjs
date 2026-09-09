import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { deleteSongRequest } from "@/services/admin/songsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 * Deletes a song and refreshes every cached list on success.
 *   const { mutate: deleteSong, isPending } = useDeleteSong()
 *   deleteSong({ id })
 */
export function useDeleteSong() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteSongRequest,
    onSuccess: () => {
      toast.success("Song deleted successfully!")
      queryClient.invalidateQueries({ queryKey: queryKeys.music.all })
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to delete song.")
    },
  })
}

