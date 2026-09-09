"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { createAlbumRequest } from "@/services/admin/albumsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useCreateAlbum() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createAlbumRequest,
    onSuccess: () => {
      toast.success("Album created successfully!")
      queryClient.invalidateQueries({ queryKey: queryKeys.albums.all })
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to create album.")
    },
  })
}

