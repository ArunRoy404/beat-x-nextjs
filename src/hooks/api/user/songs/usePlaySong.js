"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getSongStreamUrlRequest } from "@/services/user/songsServices";
import { queryKeys } from "@/lib/reactQuery/queryKeys";
import { useUserPlayerStore } from "@/zustandStore/user/userStore/userPlayerStore";

/**
 * Handles playing a song track through the global user player.
 * Calls the streaming URL endpoint and updates the persistent player store.
 * All side-effects (toasts, store updates, query cache invalidations) are encapsulated here.
 */
export function usePlaySong(options = {}) {
  const queryClient = useQueryClient();
  const currentSongId = useUserPlayerStore((state) => state.songId);
  const isPlaying = useUserPlayerStore((state) => state.isPlaying);
  const setTrack = useUserPlayerStore((state) => state.setTrack);
  const setIsPlaying = useUserPlayerStore((state) => state.setIsPlaying);

  const mutation = useMutation({
    mutationFn: async (song) => {
      const songId = song?._id || song?.id;
      if (!songId) throw new Error("Invalid song identifier");

      try {
        const streamData = await getSongStreamUrlRequest(songId);
        return { song, streamData };
      } catch (err) {
        return { song, streamData: null, error: err };
      }
    },
    onSuccess: ({ song, streamData, error }, variables) => {
      const songId = song?._id || song?.id;
      const audioSrc = streamData?.streamUrl || "/test-audio/alex-morgan-no-copyright-music-578487.mp3";

      setTrack({
        id: songId,
        title: song?.title || "Unknown Title",
        artist: song?.artist || song?.subtitle || "Unknown Artist",
        artwork: song?.coverUrl || song?.art || song?.artwork || "",
        src: audioSrc,
        liked: song?.isLiked || false,
        streamType: streamData?.streamType || "mp3",
      });

      if (error) {
        toast.info("Playing audio preview (Sign in for full access)");
      } else {
        toast.success(`Now playing: ${song?.title || "Song"}`);
      }

      queryClient.invalidateQueries({ queryKey: queryKeys.songs.home() });

      options?.onSuccess?.({ song, streamData }, variables);
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to load audio stream");
      options?.onError?.(error);
    },
  });

  const handlePlaySong = (song) => {
    const songId = song?._id || song?.id;
    if (currentSongId === songId) {
      setIsPlaying(!isPlaying);
      return;
    }
    mutation.mutate(song);
  };

  return {
    playSong: handlePlaySong,
    isPending: mutation.isPending,
    currentSongId,
    isPlaying,
  };
}
