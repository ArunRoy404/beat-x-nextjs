import { create } from "zustand"
import { greetingData, statsCards } from "@/dummydata/dashboardData"

export const useDashboardStore = create((set) => ({
  greetingData: greetingData,
  statsCards: statsCards,
  setGreetingData: (data) => set({ greetingData: data }),
  setStatsCards: (cards) => set({ statsCards: cards }),
}))
