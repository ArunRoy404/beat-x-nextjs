import { create } from "zustand"
import {
  podcastStatsCards,
  podcastPerformanceData,
  podcastPlatformData,
  podcastCountryData
} from "@/dummyData/admin/adminData/podcastDetailsAnalyticsData"

export const usePodcastDetailsAnalyticsStore = create((set) => ({
  podcastStatsCards: podcastStatsCards,
  podcastPerformanceData: podcastPerformanceData,
  podcastPlatformData: podcastPlatformData,
  podcastCountryData: podcastCountryData,

  setPodcastStatsCards: (cards) => set({ podcastStatsCards: cards }),
  setPodcastPerformanceData: (data) => set({ podcastPerformanceData: data }),
  setPodcastPlatformData: (data) => set({ podcastPlatformData: data }),
  setPodcastCountryData: (data) => set({ podcastCountryData: data })
}))
