import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { updateSongStatusRequest } from "@/services/admin/songsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 * Take Down / Restore — a status-only PATCH against the same update route.
 *   const { mutate: updateSongStatus, isPending } = useUpdateSongStatus()
 *   updateSongStatus({ id, status: "archived" })
 */
export function useUpdateSongStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateSongStatusRequest,
    onSuccess: (_data, variables) => {
      toast.success(variables?.status === "archived" ? "Song taken down." : "Song restored.")
      queryClient.invalidateQueries({ queryKey: queryKeys.music.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.music.detail(variables?.id) })
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to update song status.")
    },
  })
}

