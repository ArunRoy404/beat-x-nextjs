import { create } from "zustand"
import { podcastsList } from "@/dummyData/admin/adminData/adminDashboardPodcastsData"

// Only the Create (Upload New Podcast) flow is still dummy-backed — List,
// Update and Delete now go through the real Admin — Podcasts (Moderation)
// API and read from usePodcasts()/PodcastsContainer instead of this store.
export const useAdminDashboardPodcastsStore = create((set) => ({
  podcastsList: podcastsList,
  addPodcast: (newPodcast) => set((state) => ({
    podcastsList: [
      {
        id: state.podcastsList.length + 1,
        title: newPodcast.episodeTitle,
        duration: "45:00",
        artist: newPodcast.artist || "Unknown Host",
        series: newPodcast.seriesName || "Single",
        genre: newPodcast.category || "General",
        streams: "0",
        released: newPodcast.releaseDate ? newPodcast.releaseDate.toISOString().split('T')[0] : "-",
        status: newPodcast.visibility === "publish"
          ? "Published"
          : newPodcast.visibility === "schedule"
            ? "Scheduled"
            : "Draft",
        cover: newPodcast.coverImage && typeof newPodcast.coverImage === "object"
          ? URL.createObjectURL(newPodcast.coverImage)
          : "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=150",
        season: newPodcast.season || "1",
        episode: newPodcast.episodeNumber || "1",
        listeners: "0",
        description: newPodcast.description || "",
        isExplicit: newPodcast.isExplicit || false,
        audioFile: newPodcast.audioFile && typeof newPodcast.audioFile === "object"
          ? { name: newPodcast.audioFile.name, size: "230MB", format: "MP3" }
          : { name: "Audio file Seasonal", size: "230MB", format: "MP3" }
      },
      ...state.podcastsList
    ]
  })),
}))
