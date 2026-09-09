import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { requestMoreInfoArtistRequest } from "@/services/admin/artistsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useRequestMoreInfoArtist() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: requestMoreInfoArtistRequest,
    onSuccess: (_data, variables) => {
      toast.info("Information request sent to artist.")
      queryClient.invalidateQueries({ queryKey: queryKeys.artists.all })
      if (variables?.id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.artists.detail(variables.id) })
      }
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || err?.message || "Failed to request info.")
    },
  })
}

