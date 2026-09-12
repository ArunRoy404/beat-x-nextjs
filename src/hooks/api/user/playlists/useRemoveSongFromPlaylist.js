"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { removeSongFromPlaylistRequest } from "@/services/user/playlistsServices";
import { queryKeys } from "@/lib/reactQuery/queryKeys";

export function useRemoveSongFromPlaylist(options = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ playlistId, songId }) => removeSongFromPlaylistRequest({ playlistId, songId }),
    onSuccess: (data, variables, context) => {
      toast.success("Song removed from playlist.");
      if (variables?.playlistId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.playlists.detail(variables.playlistId) });
      }
      queryClient.invalidateQueries({ queryKey: queryKeys.playlists.all });
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to remove song.");
      options?.onError?.(error, variables, context);
    },
  });
}
