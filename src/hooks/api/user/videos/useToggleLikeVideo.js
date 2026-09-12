"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { toggleLikeVideoRequest } from "@/services/user/videosServices";
import { queryKeys } from "@/lib/reactQuery/queryKeys";
import { useGlobalMediaPlayerStore } from "@/zustandStore/media/useGlobalMediaPlayerStore";

/**
 * Toggles like on a video.
 * Encapsulates all side effects (toasts, store updates, query cache invalidations).
 */
export function useToggleLikeVideo(options = {}) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id) => toggleLikeVideoRequest(id),
    onMutate: async (id) => {
      let prevGlobalLiked = null;
      if (useGlobalMediaPlayerStore.getState().id === id) {
        prevGlobalLiked = useGlobalMediaPlayerStore.getState().liked;
        useGlobalMediaPlayerStore.getState().setLiked(!prevGlobalLiked);
      }
      return { prevGlobalLiked, id };
    },
    onSuccess: (data, id) => {
      const isLiked =
        typeof data?.liked === "boolean" ? data.liked : Boolean(data?.isLiked);

      if (useGlobalMediaPlayerStore.getState().id === id) {
        useGlobalMediaPlayerStore.getState().setLiked(isLiked);
      }

      queryClient.invalidateQueries({ queryKey: queryKeys.videos.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.videos.detail(id) });

      options?.onSuccess?.(data, id);
    },
    onError: (error, id, context) => {
      if (
        context?.prevGlobalLiked !== null &&
        useGlobalMediaPlayerStore.getState().id === id
      ) {
        useGlobalMediaPlayerStore.getState().setLiked(context.prevGlobalLiked);
      }
      toast.error(error?.message || "Failed to update like status");
      options?.onError?.(error);
    },
  });

  return {
    toggleLikeVideo: mutation.mutate,
    toggleLikeVideoAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
