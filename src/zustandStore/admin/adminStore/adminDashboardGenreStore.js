import { create } from "zustand"
import {
  genreStatsCards,
  genreContentTypes,
  genresList
} from "@/dummyData/admin/adminData/adminDashboardGenreData"

export const useAdminDashboardGenreStore = create((set) => ({
  genreStatsCards: genreStatsCards,
  genreContentTypes: genreContentTypes,
  genresList: genresList,
  selectedTypeFilter: "All",
  searchQuery: "",
  currentPage: 1,

  setGenreStatsCards: (cards) => set({ genreStatsCards: cards }),
  setGenreContentTypes: (types) => set({ genreContentTypes: types }),
  setGenresList: (list) => set({ genresList: list }),
  setSelectedTypeFilter: (filter) => set({ selectedTypeFilter: filter }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setCurrentPage: (page) => set({ currentPage: page }),

  addGenre: (genre) => set((state) => ({
    genresList: [
      ...state.genresList,
      {
        id: state.genresList.length ? Math.max(...state.genresList.map(g => g.id)) + 1 : 1,
        progress: 0,
        status: "Active",
        ...genre
      }
    ]
  })),

  deleteGenre: (id) => set((state) => ({
    genresList: state.genresList.filter((g) => g.id !== id)
  })),

  updateGenre: (updatedGenre) => set((state) => ({
    genresList: state.genresList.map((g) => g.id === updatedGenre.id ? { ...g, ...updatedGenre } : g)
  }))
}))
