import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { deleteArtistRequest } from "@/services/admin/artistsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useDeleteArtist() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteArtistRequest,
    onSuccess: () => {
      toast.success("Artist deleted successfully!")
      queryClient.invalidateQueries({ queryKey: queryKeys.artists.all })
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || err?.message || "Failed to delete artist. Check admin password.")
    },
  })
}

