import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { rejectArtistRequest } from "@/services/admin/artistsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useRejectArtist() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: rejectArtistRequest,
    onSuccess: (_data, variables) => {
      toast.error("Artist application rejected.")
      queryClient.invalidateQueries({ queryKey: queryKeys.artists.all })
      if (variables?.id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.artists.detail(variables.id) })
      }
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || err?.message || "Failed to reject artist.")
    },
  })
}

