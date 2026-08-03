import { create } from "zustand"
import {
  videoStatsCards,
  videoPerformanceData,
  videoRetentionData,
  videoDeviceData
} from "@/dummyData/admin/adminData/videoDetailsAnalyticsData"

export const useVideoDetailsAnalyticsStore = create((set) => ({
  videoStatsCards: videoStatsCards,
  videoPerformanceData: videoPerformanceData,
  videoRetentionData: videoRetentionData,
  videoDeviceData: videoDeviceData,

  setVideoStatsCards: (cards) => set({ videoStatsCards: cards }),
  setVideoPerformanceData: (data) => set({ videoPerformanceData: data }),
  setVideoRetentionData: (data) => set({ videoRetentionData: data }),
  setVideoDeviceData: (data) => set({ videoDeviceData: data })
}))
