import { create } from "zustand"
import {
  audioBookStatsCards,
  audioBookPerformanceData,
  audioBookDropoffData,
  audioBookCountryData
} from "@/dummyData/admin/adminData/audioBookDetailsAnalyticsData"

export const useAudioBookDetailsAnalyticsStore = create((set) => ({
  audioBookStatsCards: audioBookStatsCards,
  audioBookPerformanceData: audioBookPerformanceData,
  audioBookDropoffData: audioBookDropoffData,
  audioBookCountryData: audioBookCountryData,

  setAudioBookStatsCards: (cards) => set({ audioBookStatsCards: cards }),
  setAudioBookPerformanceData: (data) => set({ audioBookPerformanceData: data }),
  setAudioBookDropoffData: (data) => set({ audioBookDropoffData: data }),
  setAudioBookCountryData: (data) => set({ audioBookCountryData: data })
}))
