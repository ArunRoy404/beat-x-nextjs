import { create } from "zustand"
import {
  musicStatsCards,
  songsList
} from "@/dummyData/admin/adminData/adminDashboardMusicData"

export const useAdminDashboardMusicStore = create((set) => ({
  musicStatsCards: musicStatsCards,
  songsList: songsList,
  addSong: (newSong) => set((state) => ({
    songsList: [
      {
        id: state.songsList.length + 1,
        title: newSong.songTitle,
        duration: "3:45",
        album: newSong.album || "Single",
        genre: newSong.genre,
        streams: "0",
        released: newSong.releaseDate ? newSong.releaseDate.toISOString().split('T')[0] : "-",
        status: newSong.visibility === "publish"
          ? "Published"
          : newSong.visibility === "schedule"
            ? "Scheduled"
            : "Draft",
        cover: newSong.coverImage && typeof newSong.coverImage === "object"
          ? URL.createObjectURL(newSong.coverImage)
          : "/images/tumi_onek_dami.png",
      },
      ...state.songsList
    ]
  })),
  updateSong: (id, updatedSong) => set((state) => ({
    songsList: state.songsList.map((song) => {
      if (song.id === id) {
        return {
          ...song,
          title: updatedSong.songTitle,
          artist: updatedSong.artist,
          album: updatedSong.album || "Single",
          genre: updatedSong.genre,
          released: updatedSong.releaseDate
            ? (updatedSong.releaseDate instanceof Date
              ? updatedSong.releaseDate.toISOString().split('T')[0]
              : updatedSong.releaseDate)
            : "-",
          status: updatedSong.visibility === "publish"
            ? "Published"
            : updatedSong.visibility === "schedule"
              ? "Scheduled"
              : "Draft",
          cover: updatedSong.coverImage && typeof updatedSong.coverImage === "object"
            ? URL.createObjectURL(updatedSong.coverImage)
            : (updatedSong.coverImage || song.cover),
          isExplicit: updatedSong.isExplicit,
          description: updatedSong.description,
        }
      }
      return song
    })
  })),
  deleteSong: (id) => set((state) => ({
    songsList: state.songsList.filter((song) => song.id !== id)
  }))
}))

