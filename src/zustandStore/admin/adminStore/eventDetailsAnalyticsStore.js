import { create } from "zustand"
import {
  eventStatsCards,
  eventPerformanceData,
  eventPlatformData,
  eventCountryData
} from "@/dummyData/admin/adminData/eventDetailsAnalyticsData"

export const useEventDetailsAnalyticsStore = create((set) => ({
  eventStatsCards: eventStatsCards,
  eventPerformanceData: eventPerformanceData,
  eventPlatformData: eventPlatformData,
  eventCountryData: eventCountryData,
  setEventStatsCards: (cards) => set({ eventStatsCards: cards }),
  setEventPerformanceData: (data) => set({ eventPerformanceData: data }),
  setEventPlatformData: (data) => set({ eventPlatformData: data }),
  setEventCountryData: (data) => set({ eventCountryData: data })
}))
