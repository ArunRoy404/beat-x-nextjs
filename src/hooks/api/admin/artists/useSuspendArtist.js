import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { suspendArtistRequest } from "@/services/admin/artistsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useSuspendArtist() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: suspendArtistRequest,
    onSuccess: (_data, variables) => {
      toast.warning("Artist suspended!")
      queryClient.invalidateQueries({ queryKey: queryKeys.artists.all })
      if (variables?.id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.artists.detail(variables.id) })
      }
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || err?.message || "Failed to suspend artist.")
    },
  })
}

