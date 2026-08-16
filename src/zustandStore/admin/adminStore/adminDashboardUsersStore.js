import { create } from "zustand"

export const useAdminDashboardUsersStore = create((set) => ({
  selectedStatusFilter: "All",
  searchQuery: "",
  currentPage: 1,

  setSelectedStatusFilter: (filter) => set({ selectedStatusFilter: filter }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setCurrentPage: (page) => set({ currentPage: page }),
}))
