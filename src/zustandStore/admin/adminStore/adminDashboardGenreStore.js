import { create } from "zustand"

export const useAdminDashboardGenreStore = create((set) => ({
  searchQuery: "",
  currentPage: 1,

  setSearchQuery: (query) => set({ searchQuery: query }),
  setCurrentPage: (page) => set({ currentPage: page }),
}))
