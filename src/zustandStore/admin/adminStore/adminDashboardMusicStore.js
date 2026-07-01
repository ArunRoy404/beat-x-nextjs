import { create } from "zustand"
import { 
  musicStatsCards, 
  songsList 
} from "@/dummyData/admin/adminData/adminDashboardMusicData"

export const useAdminDashboardMusicStore = create((set) => ({
  musicStatsCards: musicStatsCards,
  songsList: songsList,
  
  setMusicStatsCards: (cards) => set({ musicStatsCards: cards }),
  setSongsList: (songs) => set({ songsList: songs }),
  addSong: (song) => set((state) => ({ songsList: [...state.songsList, song] })),
  deleteSong: (id) => set((state) => ({ songsList: state.songsList.filter(s => s.id !== id) }))
}))
