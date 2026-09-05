import { create } from "zustand"

export const useAdminDashboardShopStore = create((set) => ({
  shopStatsCards: [],
  productsList: [],
  selectedStatusFilter: "All",
  searchQuery: "",
  currentPage: 1,

  setShopStatsCards: (cards) => set({ shopStatsCards: cards }),
  setProductsList: (list) => set({ productsList: list }),
  setSelectedStatusFilter: (filter) => set({ selectedStatusFilter: filter, currentPage: 1 }),
  setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),
  setCurrentPage: (page) => set({ currentPage: page }),
}))

