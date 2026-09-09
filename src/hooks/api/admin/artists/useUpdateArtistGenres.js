import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { updateArtistGenresRequest } from "@/services/admin/artistsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useUpdateArtistGenres() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateArtistGenresRequest,
    onSuccess: (_data, variables) => {
      toast.success("Genres updated successfully!")
      queryClient.invalidateQueries({ queryKey: queryKeys.artists.all })
      if (variables?.id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.artists.detail(variables.id) })
      }
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || err?.message || "Failed to update genres.")
    },
  })
}

