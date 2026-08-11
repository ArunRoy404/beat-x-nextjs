import { create } from "zustand"
import {
  revenueStatsCards,
  revenueByType,
  monthlyRevenueData,
  transactionHistory
} from "@/dummyData/artist/artistData/artistRevenueData"

export const useArtistRevenueStore = create((set) => ({
  revenueStatsCards: revenueStatsCards,
  revenueByType: revenueByType,
  monthlyRevenueData: monthlyRevenueData,
  transactionHistory: transactionHistory,

  deleteTransaction: (id) => set((state) => ({
    transactionHistory: state.transactionHistory.filter((t) => t.id !== id)
  }))
}))
