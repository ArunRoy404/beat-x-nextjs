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
  }))
}))
