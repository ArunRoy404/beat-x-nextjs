import { create } from "zustand"

export const useUserPlayerStore = create((set) => ({
  songId: null,
  title: "",
  artist: "",
  artwork: "",
  src: "",
  liked: false,
  streamType: "mp3",
  isPlaying: false,
  setTrack: ({ id, title, artist, artwork, src, liked, streamType }) =>
    set({
      songId: id || null,
      title: title || "",
      artist: artist || "",
      artwork: artwork || "",
      src: src || "",
      liked: Boolean(liked),
      streamType: streamType || "mp3",
      isPlaying: true,
    }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setLiked: (liked) => set({ liked }),
  toggleLiked: () => set((state) => ({ liked: !state.liked })),
}))

