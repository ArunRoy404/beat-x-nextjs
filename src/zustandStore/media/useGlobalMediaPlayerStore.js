import { create } from "zustand";
import {
  canPlayNext,
  canPlayPrev,
  getNextIndex,
  getPrevIndex,
  normalizeSong,
} from "@/lib/player/playerUtils";
import { useUserPlayerStore } from "@/zustandStore/user/userStore/userPlayerStore";

export const useGlobalMediaPlayerStore = create((set, get) => ({
  isOpen: false,
  isMinimized: false,
  isPlaying: false,
  mediaType: "audio", // 'audio' | 'video'
  id: null,
  src: null,
  title: "",
  artist: "",
  coverUrl: "",
  currentTime: 0,
  duration: 0,
  liked: false,

  // Queue & Navigation state
  queue: [],
  currentIndex: -1,
  isShuffle: false,
  repeatMode: "off", // 'off' | 'all' | 'one'
  history: [],

  // Action to start or update playing media
  playMedia: (media, options = {}) => {
    // 1. Mutual exclusion: pause user music player to prevent overlapping audio
    try {
      useUserPlayerStore.getState().setIsPlaying(false);
    } catch (e) {}

    const {
      id,
      src,
      mediaType = "audio",
      title = "",
      artist = "",
      coverUrl = "",
      durationMs = 0,
      liked = false,
      isLiked = false,
    } = media || {};

    const currentState = get();
    const targetId = id || src;

    // If same media is already active and no new queue is specified, just resume
    if (
      currentState.id === targetId &&
      currentState.src === src &&
      currentState.src &&
      !options?.queue
    ) {
      set({
        isOpen: true,
        isPlaying: true,
      });
      return;
    }

    let newQueue = currentState.queue;
    let newIndex = currentState.currentIndex;

    if (Array.isArray(options?.queue) && options.queue.length > 0) {
      newQueue = options.queue.map(normalizeSong).filter(Boolean);
      newIndex =
        typeof options.index === "number" &&
        options.index >= 0 &&
        options.index < newQueue.length
          ? options.index
          : newQueue.findIndex((item) => (item?.id || item?._id) === targetId);
      if (newIndex < 0) newIndex = 0;
    } else if (targetId) {
      // Check if item exists in current queue
      const existingIdx = currentState.queue.findIndex(
        (item) => (item?.id || item?._id) === targetId
      );
      if (existingIdx >= 0) {
        newIndex = existingIdx;
      } else {
        const normalized = normalizeSong({
          id: targetId,
          src,
          mediaType,
          title,
          artist,
          coverUrl,
          durationMs,
        });
        newQueue = normalized ? [normalized] : [];
        newIndex = 0;
      }
    }

    set({
      isOpen: true,
      isMinimized: false,
      isPlaying: true,
      id: targetId,
      src,
      mediaType,
      title,
      artist,
      coverUrl,
      currentTime: 0,
      duration: durationMs ? durationMs / 1000 : 0,
      liked: Boolean(liked || isLiked),
      queue: newQueue,
      currentIndex: newIndex,
    });
  },

  togglePlay: () => {
    const state = get();
    if (!state.isPlaying) {
      try {
        useUserPlayerStore.getState().setIsPlaying(false);
      } catch (e) {}
    }
    set({ isPlaying: !state.isPlaying });
  },
  pauseMedia: () => set({ isPlaying: false }),
  resumeMedia: () => {
    try {
      useUserPlayerStore.getState().setIsPlaying(false);
    } catch (e) {}
    set({ isPlaying: true });
  },

  setCurrentTime: (currentTime) => set({ currentTime }),
  setDuration: (duration) => set({ duration }),
  seekTo: (time) => set({ currentTime: time }),
  setLiked: (liked) => set({ liked: Boolean(liked) }),
  toggleLiked: () => set((state) => ({ liked: !state.liked })),

  // Queue actions
  setQueue: (rawQueue, startIndex = 0) => {
    const queue = Array.isArray(rawQueue)
      ? rawQueue.map(normalizeSong).filter(Boolean)
      : [];
    const validIndex =
      typeof startIndex === "number" && startIndex >= 0 && startIndex < queue.length
        ? startIndex
        : 0;
    set({
      queue,
      currentIndex: validIndex,
      history: [],
    });
  },

  playNext: () => {
    const state = get();
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
      set({ isPlaying: false });
      return;
    }

    const nextItem = currentQ[nextIdx];
    if (!nextItem) return;

    if (currIdx >= 0) {
      set((s) => ({ history: [...s.history, currIdx] }));
    }

    try {
      useUserPlayerStore.getState().setIsPlaying(false);
    } catch (e) {}

    const nextSrc = nextItem.src || nextItem.hlsMasterUrl || nextItem.audioUrl || nextItem.videoUrl;
    set({
      id: nextItem.id || nextItem._id || nextSrc,
      src: nextSrc,
      mediaType: nextItem.mediaType || state.mediaType,
      title: nextItem.title || "Media Track",
      artist: nextItem.artist || "BeatX",
      coverUrl: nextItem.coverUrl || nextItem.artwork || "",
      currentTime: 0,
      duration: nextItem.durationMs ? nextItem.durationMs / 1000 : 0,
      liked: Boolean(nextItem.liked || nextItem.isLiked),
      currentIndex: nextIdx,
      isPlaying: true,
    });
  },

  playPrev: () => {
    const state = get();
    const currentQ = state.queue || [];
    const currIdx = state.currentIndex;
    const shuffleActive = state.isShuffle;
    const repMode = state.repeatMode;
    const hist = state.history || [];

    if (!currentQ || currentQ.length === 0) return;

    let prevIdx = -1;
    if (shuffleActive && hist.length > 0) {
      prevIdx = hist[hist.length - 1];
      set({ history: hist.slice(0, -1) });
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

    const prevItem = currentQ[prevIdx];
    if (!prevItem) return;

    try {
      useUserPlayerStore.getState().setIsPlaying(false);
    } catch (e) {}

    const prevSrc = prevItem.src || prevItem.hlsMasterUrl || prevItem.audioUrl || prevItem.videoUrl;
    set({
      id: prevItem.id || prevItem._id || prevSrc,
      src: prevSrc,
      mediaType: prevItem.mediaType || state.mediaType,
      title: prevItem.title || "Media Track",
      artist: prevItem.artist || "BeatX",
      coverUrl: prevItem.coverUrl || prevItem.artwork || "",
      currentTime: 0,
      duration: prevItem.durationMs ? prevItem.durationMs / 1000 : 0,
      liked: Boolean(prevItem.liked || prevItem.isLiked),
      currentIndex: prevIdx,
      isPlaying: true,
    });
  },

  // Shuffle & Repeat
  setIsShuffle: (isShuffle) => set({ isShuffle }),
  toggleShuffle: () => set((state) => ({ isShuffle: !state.isShuffle })),
  setRepeatMode: (repeatMode) => set({ repeatMode }),
  toggleRepeatMode: () =>
    set((state) => {
      const next =
        state.repeatMode === "off"
          ? "all"
          : state.repeatMode === "all"
          ? "one"
          : "off";
      return { repeatMode: next };
    }),

  toggleMinimize: () => set((state) => ({ isMinimized: !state.isMinimized })),
  closePlayer: () =>
    set({
      isOpen: false,
      isPlaying: false,
      src: null,
      id: null,
      liked: false,
      currentTime: 0,
      queue: [],
      currentIndex: -1,
      history: [],
    }),
}));

