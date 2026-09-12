"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createPlaylistRequest } from "@/services/user/playlistsServices";
import { queryKeys } from "@/lib/reactQuery/queryKeys";

export function useCreatePlaylist(options = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => createPlaylistRequest(payload),
    onSuccess: (data, variables, context) => {
      toast.success("Playlist created successfully!");
      queryClient.invalidateQueries({ queryKey: queryKeys.playlists.all });
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to create playlist.");
      options?.onError?.(error, variables, context);
    },
  });
}
