import { create } from "zustand"
import {
  analyticsStatsCards,
  growthOverviewData,
  peakListeningHoursData,
  genreDistributionData
} from "@/dummyData/admin/adminData/adminDashboardAnalyticsData"

export const useAdminDashboardAnalyticsStore = create((set) => ({
  analyticsStatsCards: analyticsStatsCards,
  growthOverviewData: growthOverviewData,
  peakListeningHoursData: peakListeningHoursData,
  genreDistributionData: genreDistributionData,

  setAnalyticsStatsCards: (cards) => set({ analyticsStatsCards: cards }),
  setGrowthOverviewData: (data) => set({ growthOverviewData: data }),
  setPeakListeningHoursData: (data) => set({ peakListeningHoursData: data }),
  setGenreDistributionData: (data) => set({ genreDistributionData: data })
}))
