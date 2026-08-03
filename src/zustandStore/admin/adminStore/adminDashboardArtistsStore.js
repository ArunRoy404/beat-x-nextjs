import { create } from "zustand"
import {
  artistsStatsCards,
  artistsList
} from "@/dummyData/admin/adminData/adminDashboardArtistsData"

export const useAdminDashboardArtistsStore = create((set) => ({
  artistsStatsCards: artistsStatsCards,
  artistsList: artistsList,
  selectedStatusFilter: "All",
  searchQuery: "",
  currentPage: 1,

  setArtistsStatsCards: (cards) => set({ artistsStatsCards: cards }),
  setArtistsList: (list) => set({ artistsList: list }),
  setSelectedStatusFilter: (filter) => set({ selectedStatusFilter: filter, currentPage: 1 }),
  setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),
  setCurrentPage: (page) => set({ currentPage: page }),

  addArtist: (artist) => set((state) => ({
    artistsList: [
      {
        id: state.artistsList.length ? Math.max(...state.artistsList.map(a => a.id)) + 1 : 1,
        avatar: "",
        isVerified: false,
        songsCount: 0,
        followers: 0,
        revenue: 0,
        ...artist
      },
      ...state.artistsList,
    ]
  })),

  deleteArtist: (id) => set((state) => ({
    artistsList: state.artistsList.filter((a) => a.id !== id)
  })),

  updateArtist: (updatedArtist) => set((state) => ({
    artistsList: state.artistsList.map((a) => a.id === updatedArtist.id ? { ...a, ...updatedArtist } : a)
  }))
}))
