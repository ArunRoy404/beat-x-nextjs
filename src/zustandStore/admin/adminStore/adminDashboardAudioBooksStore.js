import { create } from "zustand"

export const useAdminDashboardAudioBooksStore = create((set) => ({
  selectedStatus: "all",
  selectedGenre: "all",
  searchQuery: "",
  currentPage: 1,

  setSelectedStatus: (status) => set({ selectedStatus: status, currentPage: 1 }),
  setSelectedGenre: (genre) => set({ selectedGenre: genre, currentPage: 1 }),
  setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),
  setCurrentPage: (page) => set({ currentPage: page }),
}))
