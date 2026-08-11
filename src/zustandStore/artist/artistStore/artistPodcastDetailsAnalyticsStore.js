import { create } from "zustand"
import {
  podcastStatsCards,
  podcastPerformanceData,
  podcastPlatformData,
  podcastCountryData
} from "@/dummyData/artist/artistData/artistPodcastDetailsAnalyticsData"

export const useArtistPodcastDetailsAnalyticsStore = create((set) => ({
  podcastStatsCards: podcastStatsCards,
  podcastPerformanceData: podcastPerformanceData,
  podcastPlatformData: podcastPlatformData,
  podcastCountryData: podcastCountryData,
  setPodcastStatsCards: (cards) => set({ podcastStatsCards: cards }),
  setPodcastPerformanceData: (data) => set({ podcastPerformanceData: data }),
  setPodcastPlatformData: (data) => set({ podcastPlatformData: data }),
  setPodcastCountryData: (data) => set({ podcastCountryData: data })
}))
