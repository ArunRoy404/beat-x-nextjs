import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { updateArtistSocialChecklistRequest } from "@/services/admin/artistsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useUpdateArtistSocialChecklist() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateArtistSocialChecklistRequest,
    onSuccess: (_data, variables) => {
      toast.success("Social links checklist updated.")
      queryClient.invalidateQueries({ queryKey: queryKeys.artists.all })
      if (variables?.id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.artists.detail(variables.id) })
      }
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || err?.message || "Failed to update social checklist.")
    },
  })
}

