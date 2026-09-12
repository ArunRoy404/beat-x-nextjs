"use client";

import { useCallback, useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getSongStreamUrlRequest } from "@/services/user/songsServices";
import { queryKeys } from "@/lib/reactQuery/queryKeys";
import { useUserPlayerStore } from "@/zustandStore/user/userStore/userPlayerStore";
import { useGlobalMediaPlayerStore } from "@/zustandStore/media/useGlobalMediaPlayerStore";
import {
  canPlayNext,
  canPlayPrev,
  getNextIndex,
  getPrevIndex,
  normalizeSong,
} from "@/lib/player/playerUtils";

/**
 * Handles playing a song track or full playlist/queue through the global user player.
 * Calls the streaming URL endpoint and updates the persistent player store.
 * All side-effects (toasts, store updates, query cache invalidations) are encapsulated here.
 */
export function usePlaySong(options = {}) {
  const queryClient = useQueryClient();

  const currentSongId = useUserPlayerStore((state) => state.songId);
  const isPlaying = useUserPlayerStore((state) => state.isPlaying);
  const queue = useUserPlayerStore((state) => state.queue);
  const currentIndex = useUserPlayerStore((state) => state.currentIndex);
  const isShuffle = useUserPlayerStore((state) => state.isShuffle);
  const repeatMode = useUserPlayerStore((state) => state.repeatMode);
  const history = useUserPlayerStore((state) => state.history);

  const setTrack = useUserPlayerStore((state) => state.setTrack);
  const setQueue = useUserPlayerStore((state) => state.setQueue);
  const setIsPlaying = useUserPlayerStore((state) => state.setIsPlaying);
  const toggleShuffle = useUserPlayerStore((state) => state.toggleShuffle);
  const setIsShuffle = useUserPlayerStore((state) => state.setIsShuffle);
  const toggleRepeatMode = useUserPlayerStore((state) => state.toggleRepeatMode);
  const setRepeatMode = useUserPlayerStore((state) => state.setRepeatMode);
  const pushHistory = useUserPlayerStore((state) => state.pushHistory);
  const popHistory = useUserPlayerStore((state) => state.popHistory);

  const hasNext = useMemo(
    () => canPlayNext({ queue, currentIndex, isShuffle, repeatMode }),
    [queue, currentIndex, isShuffle, repeatMode]
  );

  const hasPrev = useMemo(
    () => canPlayPrev({ queue, currentIndex, isShuffle, repeatMode, history }),
    [queue, currentIndex, isShuffle, repeatMode, history]
  );

  const currentSong = useMemo(() => {
    if (currentIndex >= 0 && currentIndex < queue.length) {
      return queue[currentIndex];
    }
    return null;
  }, [queue, currentIndex]);

  const mutation = useMutation({
    mutationFn: async (payload) => {
      const song = payload?.song || payload;
      const songId = song?._id || song?.id;
      if (!songId) throw new Error("Invalid song identifier");

      try {
        const streamData = await getSongStreamUrlRequest(songId);
        return { payload, song, streamData };
      } catch (err) {
        return { payload, song, streamData: null, error: err };
      }
    },
    onSuccess: ({ payload, song, streamData, error }, variables) => {
      const songId = song?._id || song?.id;
      const audioSrc =
        streamData?.streamUrl ||
        "/test-audio/alex-morgan-no-copyright-music-578487.mp3";

      const explicitQueue = payload?.queue || variables?.queue;
      const explicitIndex = payload?.index ?? variables?.index;

      setTrack({
        id: songId,
        title: song?.title || "Unknown Title",
        artist:
          song?.artist?.name ||
          (typeof song?.artist === "string" ? song?.artist : null) ||
          song?.subtitle ||
          "Unknown Artist",
        artwork: song?.coverUrl || song?.art || song?.artwork || "",
        src: audioSrc,
        liked: song?.isLiked || song?.liked || false,
        streamType: streamData?.streamType || "mp3",
        queue: explicitQueue,
        index: explicitIndex,
      });

      // Mutual exclusion: pause any active global video/media stream
      try {
        useGlobalMediaPlayerStore.getState().pauseMedia();
      } catch (e) {}

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

  const handlePlaySong = useCallback(
    (song, songOptions = {}) => {
      const songId = song?._id || song?.id;
      if (!songId) return;

      if (songOptions?.shuffle !== undefined) {
        setIsShuffle(Boolean(songOptions.shuffle));
      }

      // If already playing this track without an explicit queue or forcePlay, toggle pause/play
      if (
        currentSongId === songId &&
        !songOptions?.forcePlay &&
        !songOptions?.queue
      ) {
        setIsPlaying(!isPlaying);
        return;
      }

      mutation.mutate({
        song,
        queue: songOptions?.queue,
        index: songOptions?.index,
        forcePlay: songOptions?.forcePlay,
      });
    },
    [currentSongId, isPlaying, mutation, setIsPlaying, setIsShuffle]
  );

  const handlePlayQueue = useCallback(
    (newQueue, startIndex = 0, queueOptions = {}) => {
      if (!Array.isArray(newQueue) || newQueue.length === 0) return;
      const validIndex =
        startIndex >= 0 && startIndex < newQueue.length ? startIndex : 0;
      const targetSong = newQueue[validIndex];
      handlePlaySong(targetSong, {
        queue: newQueue,
        index: validIndex,
        forcePlay: true,
        ...queueOptions,
      });
    },
    [handlePlaySong]
  );

  const handlePlayNext = useCallback(() => {
    const state = useUserPlayerStore.getState();
    const currentQ = state.queue || [];
    const currIdx = state.currentIndex;
    const shuffleActive = state.isShuffle;
    const repMode = state.repeatMode;

    if (!currentQ || currentQ.length === 0) return;

    const nextIdx = getNextIndex({
      queue: currentQ,
      currentIndex: currIdx,
      isShuffle: shuffleActive,
      repeatMode: repMode,
    });

    if (nextIdx < 0 || nextIdx >= currentQ.length) {
      // Reached the end of queue with repeat off
      setIsPlaying(false);
      return;
    }

    const nextSong = currentQ[nextIdx];
    if (!nextSong) return;

    if (currIdx >= 0) {
      pushHistory(currIdx);
    }

    mutation.mutate({
      song: nextSong,
      queue: currentQ,
      index: nextIdx,
      forcePlay: true,
    });
  }, [mutation, pushHistory, setIsPlaying]);

  const handlePlayPrev = useCallback(() => {
    const state = useUserPlayerStore.getState();
    const currentQ = state.queue || [];
    const currIdx = state.currentIndex;
    const shuffleActive = state.isShuffle;
    const repMode = state.repeatMode;
    const hist = state.history || [];

    if (!currentQ || currentQ.length === 0) return;

    let prevIdx = -1;
    if (shuffleActive && hist.length > 0) {
      prevIdx = popHistory();
    } else {
      prevIdx = getPrevIndex({
        queue: currentQ,
        currentIndex: currIdx,
        isShuffle: shuffleActive,
        repeatMode: repMode,
        history: hist,
      });
    }

    if (prevIdx < 0 || prevIdx >= currentQ.length) return;

    const prevSong = currentQ[prevIdx];
    if (!prevSong) return;

    mutation.mutate({
      song: prevSong,
      queue: currentQ,
      index: prevIdx,
      forcePlay: true,
    });
  }, [mutation, popHistory]);

  return {
    playSong: handlePlaySong,
    playQueue: handlePlayQueue,
    playNext: handlePlayNext,
    playPrev: handlePlayPrev,
    toggleShuffle,
    setIsShuffle,
    toggleRepeatMode,
    setRepeatMode,
    hasNext,
    hasPrev,
    isShuffle,
    repeatMode,
    queue,
    currentIndex,
    currentSong,
    currentSongId,
    isPlaying,
    isPending: mutation.isPending,
  };
}

