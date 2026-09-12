"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updatePlaylistRequest } from "@/services/user/playlistsServices";
import { queryKeys } from "@/lib/reactQuery/queryKeys";

export function useUpdatePlaylist(options = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...payload }) => updatePlaylistRequest(id, payload),
    onSuccess: (data, variables, context) => {
      toast.success("Playlist updated successfully!");
      queryClient.invalidateQueries({ queryKey: queryKeys.playlists.all });
      if (variables?.id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.playlists.detail(variables.id) });
      }
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to update playlist.");
      options?.onError?.(error, variables, context);
    },
  });
}
