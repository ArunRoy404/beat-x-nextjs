import { create } from "zustand"
import {
  statsCards,
  weeklyStreamsDataByRange,
  revenueOverviewData,
  topTracksTableData,
  topTracksListData,
  recentActivityData,
  upcomingEventsData
} from "@/dummyData/artist/artistData/artistDashboardOverviewData"

export const useArtistDashboardOverviewStore = create((set) => ({
  statsCards: statsCards,
  weeklyStreamsDataByRange: weeklyStreamsDataByRange,
  revenueOverviewData: revenueOverviewData,
  topTracksTableData: topTracksTableData,
  topTracksListData: topTracksListData,
  recentActivityData: recentActivityData,
  upcomingEventsData: upcomingEventsData,
  setStatsCards: (data) => set({ statsCards: data }),
  setWeeklyStreamsDataByRange: (data) => set({ weeklyStreamsDataByRange: data }),
  setRevenueOverviewData: (data) => set({ revenueOverviewData: data }),
  setTopTracksTableData: (data) => set({ topTracksTableData: data }),
  setTopTracksListData: (data) => set({ topTracksListData: data }),
  setRecentActivityData: (data) => set({ recentActivityData: data }),
  setUpcomingEventsData: (data) => set({ upcomingEventsData: data }),
}))
