import { create } from "zustand";

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

  // Action to start or update playing media
  playMedia: (media) => {
    const { id, src, mediaType = "audio", title = "", artist = "", coverUrl = "", durationMs = 0 } = media || {};
    const currentState = get();

    // If same media is already active, just resume or ensure playing
    if (currentState.id === id && currentState.src === src && currentState.src) {
      set({
        isOpen: true,
        isPlaying: true,
      });
      return;
    }

    set({
      isOpen: true,
      isMinimized: false,
      isPlaying: true,
      id: id || src,
      src,
      mediaType,
      title,
      artist,
      coverUrl,
      currentTime: 0,
      duration: durationMs ? durationMs / 1000 : 0,
    });
  },

  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  pauseMedia: () => set({ isPlaying: false }),
  resumeMedia: () => set({ isPlaying: true }),
  
  setCurrentTime: (currentTime) => set({ currentTime }),
  setDuration: (duration) => set({ duration }),
  
  seekTo: (time) => set({ currentTime: time }),

  toggleMinimize: () => set((state) => ({ isMinimized: !state.isMinimized })),
  closePlayer: () =>
    set({
      isOpen: false,
      isPlaying: false,
      src: null,
      id: null,
      currentTime: 0,
    }),
}));
