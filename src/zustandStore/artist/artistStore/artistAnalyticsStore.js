import { create } from "zustand"
import {
  statsCardsByPeriod,
  growthOverviewStreamDataByRange,
  growthOverviewContentDataByRange,
  peakListeningHoursData,
  genreBreakdownData
} from "@/dummyData/artist/artistData/artistAnalyticsData"

export const useArtistAnalyticsStore = create((set) => ({
  statsCardsByPeriod: statsCardsByPeriod,
  growthOverviewStreamDataByRange: growthOverviewStreamDataByRange,
  growthOverviewContentDataByRange: growthOverviewContentDataByRange,
  peakListeningHoursData: peakListeningHoursData,
  genreBreakdownData: genreBreakdownData,
  setStatsCardsByPeriod: (data) => set({ statsCardsByPeriod: data }),
  setGrowthOverviewStreamDataByRange: (data) => set({ growthOverviewStreamDataByRange: data }),
  setGrowthOverviewContentDataByRange: (data) => set({ growthOverviewContentDataByRange: data }),
  setPeakListeningHoursData: (data) => set({ peakListeningHoursData: data }),
  setGenreBreakdownData: (data) => set({ genreBreakdownData: data }),
}))
