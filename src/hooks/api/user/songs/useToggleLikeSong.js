"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { toggleLikeSongRequest } from "@/services/user/songsServices";
import { queryKeys } from "@/lib/reactQuery/queryKeys";
import { useUserPlayerStore } from "@/zustandStore/user/userStore/userPlayerStore";

/**
 * Toggles like on a song.
 * Encapsulates all side effects (toasts, store updates, query cache invalidations).
 */
export function useToggleLikeSong(options = {}) {
  const queryClient = useQueryClient();
  const currentSongId = useUserPlayerStore((state) => state.songId);
  const togglePlayerLiked = useUserPlayerStore((state) => state.toggleLiked);

  const mutation = useMutation({
    mutationFn: (id) => toggleLikeSongRequest(id),
    onSuccess: (data, id) => {
      if (currentSongId === id) {
        togglePlayerLiked();
      }

      queryClient.invalidateQueries({ queryKey: queryKeys.songs.home() });
      queryClient.invalidateQueries({ queryKey: queryKeys.songs.detail(id) });

      if (data?.isLiked) {
        toast.success("Added to liked songs");
      } else {
        toast.success("Removed from liked songs");
      }

      options?.onSuccess?.(data, id);
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to update like status");
      options?.onError?.(error);
    },
  });

  return {
    toggleLike: mutation.mutate,
    toggleLikeAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
