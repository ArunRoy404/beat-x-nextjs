import { create } from "zustand"
import { 
  greetingData, 
  statsCards, 
  platformGrowthData, 
  genreMixData, 
  revenueStreamsData, 
  recentUploadsData,
  recentActivityData,
  upcomingEventsData
} from "@/dummydata/dashboardData"

export const useDashboardStore = create((set) => ({
  greetingData: greetingData,
  statsCards: statsCards,
  platformGrowthData: platformGrowthData,
  genreMixData: genreMixData,
  revenueStreamsData: revenueStreamsData,
  recentUploadsData: recentUploadsData,
  recentActivityData: recentActivityData,
  upcomingEventsData: upcomingEventsData,
  
  setGreetingData: (data) => set({ greetingData: data }),
  setStatsCards: (cards) => set({ statsCards: cards }),
  setPlatformGrowthData: (data) => set({ platformGrowthData: data }),
  setGenreMixData: (data) => set({ genreMixData: data }),
  setRevenueStreamsData: (data) => set({ revenueStreamsData: data }),
  setRecentUploadsData: (data) => set({ recentUploadsData: data }),
  setRecentActivityData: (data) => set({ recentActivityData: data }),
  setUpcomingEventsData: (data) => set({ upcomingEventsData: data })
}))
