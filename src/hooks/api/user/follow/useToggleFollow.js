"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { toggleFollowUserRequest } from "@/services/user/followServices";
import { queryKeys } from "@/lib/reactQuery/queryKeys";

/**
 * Toggles following an artist/user.
 * All side-effects (toasts and cache invalidations) are encapsulated in this hook.
 */
export function useToggleFollow(options = {}) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id }) => toggleFollowUserRequest({ id }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.artists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.user.me() });

      if (data?.following) {
        toast.success("Following artist");
      } else {
        toast.success("Unfollowed artist");
      }

      options?.onSuccess?.(data, variables);
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to update follow status");
      options?.onError?.(error);
    },
  });

  return {
    toggleFollow: mutation.mutate,
    toggleFollowAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
  };
}
