import { create } from "zustand"
import { 
  musicStatsCards, 
  songsList 
} from "@/dummyData/admin/adminData/adminDashboardMusicData"

export const useAdminDashboardMusicStore = create((set) => ({
  musicStatsCards: musicStatsCards,
  songsList: songsList,
}))
