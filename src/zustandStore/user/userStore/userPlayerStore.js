import { create } from "zustand";
import { normalizeSong } from "@/lib/player/playerUtils";

export const useUserPlayerStore = create((set, get) => ({
  songId: null,
  title: "",
  artist: "",
  artwork: "",
  src: "",
  liked: false,
  streamType: "mp3",
  isPlaying: false,

  // Queue & Navigation state
  queue: [],
  currentIndex: -1,
  isShuffle: false,
  repeatMode: "off", // "off" | "all" | "one"
  history: [], // Stack of played indices (for shuffle prev navigation)

  setTrack: ({ id, title, artist, artwork, src, liked, streamType, queue, index }) => {
    const state = get();
    const songId = id || null;

    let newQueue = state.queue;
    let newIndex = state.currentIndex;

    if (Array.isArray(queue) && queue.length > 0) {
      newQueue = queue.map(normalizeSong).filter(Boolean);
      newIndex =
        typeof index === "number" && index >= 0 && index < newQueue.length
          ? index
          : newQueue.findIndex((s) => (s?.id || s?._id) === songId);
      if (newIndex < 0) newIndex = 0;
    } else if (songId) {
      // If no explicit queue is passed, check if the song exists in current queue
      const existingIdx = state.queue.findIndex(
        (s) => (s?.id || s?._id) === songId
      );
      if (existingIdx >= 0) {
        newIndex = existingIdx;
      } else {
        // Standalone song playback: create single-song queue
        const singleSong = normalizeSong({
          id: songId,
          title,
          artist,
          artwork,
          src,
          liked,
          streamType,
        });
        newQueue = singleSong ? [singleSong] : [];
        newIndex = 0;
      }
    }

    set({
      songId,
      title: title || "",
      artist: artist || "",
      artwork: artwork || "",
      src: src || "",
      liked: Boolean(liked),
      streamType: streamType || "mp3",
      isPlaying: true,
      queue: newQueue,
      currentIndex: newIndex,
    });
  },

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

  setCurrentIndex: (currentIndex) => set({ currentIndex }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setLiked: (liked) => set({ liked }),
  toggleLiked: () => set((state) => ({ liked: !state.liked })),

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

  // History stack for shuffle navigation
  pushHistory: (index) =>
    set((state) => ({
      history: [...state.history, index],
    })),
  popHistory: () => {
    const { history } = get();
    if (!history || history.length === 0) return null;
    const last = history[history.length - 1];
    set({ history: history.slice(0, -1) });
    return last;
  },

  clearQueue: () =>
    set({
      queue: [],
      currentIndex: -1,
      history: [],
    }),

  closeTrack: () =>
    set({
      songId: null,
      title: "",
      artist: "",
      artwork: "",
      src: "",
      isPlaying: false,
      queue: [],
      currentIndex: -1,
      history: [],
    }),
}));


