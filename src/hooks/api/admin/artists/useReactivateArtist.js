import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { reactivateArtistRequest } from "@/services/admin/artistsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useReactivateArtist() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: reactivateArtistRequest,
    onSuccess: (_data, variables) => {
      toast.success("Artist reactivated successfully!")
      queryClient.invalidateQueries({ queryKey: queryKeys.artists.all })
      if (variables?.id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.artists.detail(variables.id) })
      }
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || err?.message || "Failed to reactivate artist.")
    },
  })
}

