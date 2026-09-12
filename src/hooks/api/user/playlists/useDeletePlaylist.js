"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deletePlaylistRequest } from "@/services/user/playlistsServices";
import { queryKeys } from "@/lib/reactQuery/queryKeys";

export function useDeletePlaylist(options = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deletePlaylistRequest(id),
    onSuccess: (data, variables, context) => {
      toast.success("Playlist deleted successfully!");
      queryClient.invalidateQueries({ queryKey: queryKeys.playlists.all });
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to delete playlist.");
      options?.onError?.(error, variables, context);
    },
  });
}
