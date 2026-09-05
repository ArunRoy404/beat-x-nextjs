"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rejectSongRequest } from "@/services/admin/songsServices";
import { queryKeys } from "@/lib/reactQuery/queryKeys";

/**
 * Rejects an artist-submitted song (PATCH /admin/songs/:id/reject with { reason }).
 */
export function useRejectSong() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rejectSongRequest,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.music.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.music.detail(variables.id) });
    },
  });
}
