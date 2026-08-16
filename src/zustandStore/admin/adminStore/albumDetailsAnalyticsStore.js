import { create } from "zustand"
import {
  albumStatsCards,
  albumPerformanceData,
  albumPlatformData,
  albumCountryData
} from "@/dummyData/admin/adminData/albumDetailsAnalyticsData"

export const useAlbumDetailsAnalyticsStore = create((set) => ({
  albumStatsCards: albumStatsCards,
  albumPerformanceData: albumPerformanceData,
  albumPlatformData: albumPlatformData,
  albumCountryData: albumCountryData,

  setAlbumStatsCards: (cards) => set({ albumStatsCards: cards }),
  setAlbumPerformanceData: (data) => set({ albumPerformanceData: data }),
  setAlbumPlatformData: (data) => set({ albumPlatformData: data }),
  setAlbumCountryData: (data) => set({ albumCountryData: data })
}))
