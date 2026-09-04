"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { approveSongRequest } from "@/services/admin/songsServices";
import { queryKeys } from "@/lib/reactQuery/queryKeys";

/**
 * Approves an artist-submitted song (PATCH /admin/songs/:id/approve).
 */
export function useApproveSong() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveSongRequest,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.music.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.music.detail(variables.id) });
    },
  });
}
