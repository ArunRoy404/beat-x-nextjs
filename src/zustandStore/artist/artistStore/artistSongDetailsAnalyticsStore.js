import { create } from "zustand"
import {
  songStatsCards,
  songPerformanceData,
  songPlatformData,
  songCountryData
} from "@/dummyData/artist/artistData/artistSongDetailsAnalyticsData"

export const useArtistSongDetailsAnalyticsStore = create((set) => ({
  songStatsCards: songStatsCards,
  songPerformanceData: songPerformanceData,
  songPlatformData: songPlatformData,
  songCountryData: songCountryData,

  setSongStatsCards: (cards) => set({ songStatsCards: cards }),
  setSongPerformanceData: (data) => set({ songPerformanceData: data }),
  setSongPlatformData: (data) => set({ songPlatformData: data }),
  setSongCountryData: (data) => set({ songCountryData: data })
}))
