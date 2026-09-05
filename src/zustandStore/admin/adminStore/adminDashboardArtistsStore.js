import { create } from "zustand"

export const useAdminDashboardArtistsStore = create((set) => ({
  selectedStatusFilter: "All",
  searchQuery: "",
  currentPage: 1,

  setSelectedStatusFilter: (filter) => set({ selectedStatusFilter: filter, currentPage: 1 }),
  setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),
  setCurrentPage: (page) => set({ currentPage: page }),
}))
