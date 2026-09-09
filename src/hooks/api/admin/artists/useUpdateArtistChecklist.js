import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { updateArtistChecklistRequest } from "@/services/admin/artistsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useUpdateArtistChecklist() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateArtistChecklistRequest,
    onSuccess: (_data, variables) => {
      toast.success("Document checklist updated.")
      queryClient.invalidateQueries({ queryKey: queryKeys.artists.all })
      if (variables?.id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.artists.detail(variables.id) })
      }
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || err?.message || "Failed to update document checklist.")
    },
  })
}

