import { create } from "zustand"
import {
  podcastsStatsCards,
  podcastsList
} from "@/dummyData/artist/artistData/artistPodcastsData"

export const useArtistPodcastsStore = create((set) => ({
  podcastsStatsCards: podcastsStatsCards,
  podcastsList: podcastsList,
  addPodcast: (newPodcast) => set((state) => ({
    podcastsList: [
      {
        id: state.podcastsList.length + 1,
        title: newPodcast.episodeTitle,
        duration: "45:00",
        artist: newPodcast.artist || "TAHSIN",
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
  updatePodcast: (id, updatedPodcast) => set((state) => ({
    podcastsList: state.podcastsList.map((pod) => {
      if (pod.id === id) {
        return {
          ...pod,
          title: updatedPodcast.episodeTitle,
          artist: updatedPodcast.artist,
          series: updatedPodcast.seriesName || "Single",
          genre: updatedPodcast.category,
          released: updatedPodcast.releaseDate
            ? (updatedPodcast.releaseDate instanceof Date
              ? updatedPodcast.releaseDate.toISOString().split('T')[0]
              : updatedPodcast.releaseDate)
            : "-",
          status: updatedPodcast.visibility === "publish"
            ? "Published"
            : updatedPodcast.visibility === "schedule"
              ? "Scheduled"
              : "Draft",
          cover: updatedPodcast.coverImage && typeof updatedPodcast.coverImage === "object"
            ? URL.createObjectURL(updatedPodcast.coverImage)
            : (updatedPodcast.coverImage || pod.cover),
          isExplicit: updatedPodcast.isExplicit,
          description: updatedPodcast.description,
          season: updatedPodcast.season,
          episode: updatedPodcast.episodeNumber,
          audioFile: updatedPodcast.audioFile && typeof updatedPodcast.audioFile === "object"
            ? { name: updatedPodcast.audioFile.name, size: "230MB", format: "MP3" }
            : (updatedPodcast.audioFile || pod.audioFile)
        }
      }
      return pod
    })
  })),
  deletePodcast: (id) => set((state) => ({
    podcastsList: state.podcastsList.filter((pod) => pod.id !== id)
  }))
}))
