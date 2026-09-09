"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { updateAlbumRequest } from "@/services/admin/albumsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useUpdateAlbum() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateAlbumRequest,
    onSuccess: (_data, variables) => {
      toast.success("Album updated successfully!")
      queryClient.invalidateQueries({ queryKey: queryKeys.albums.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.albums.detail(variables?.id) })
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to update album.")
    },
  })
}

