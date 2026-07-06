import { create } from "zustand"
import {
  albumsStatsCards,
  albumsList
} from "@/dummyData/admin/adminData/adminDashboardAlbumsData"

export const useAdminDashboardAlbumsStore = create((set) => ({
  albumsStatsCards: albumsStatsCards,
  albumsList: albumsList,
  selectedStatusFilter: "All",
  searchQuery: "",
  currentPage: 1,

  setAlbumsStatsCards: (cards) => set({ albumsStatsCards: cards }),
  setAlbumsList: (list) => set({ albumsList: list }),
  setSelectedStatusFilter: (filter) => set({ selectedStatusFilter: filter }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setCurrentPage: (page) => set({ currentPage: page }),

  addAlbum: (album) => set((state) => {
    const newId = state.albumsList.length ? Math.max(...state.albumsList.map(a => a.id)) + 1 : 1
    const newAlbum = {
      id: newId,
      tracksCount: 0,
      duration: "0 min",
      streams: 0,
      released: new Date().toISOString().split("T")[0],
      tracksList: [],
      avatar: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=150",
      ...album
    }
    return {
      albumsList: [newAlbum, ...state.albumsList]
    }
  }),

  deleteAlbum: (id) => set((state) => ({
    albumsList: state.albumsList.filter((a) => a.id !== id)
  })),

  updateAlbum: (updatedAlbum) => set((state) => ({
    albumsList: state.albumsList.map((a) => a.id === updatedAlbum.id ? { ...a, ...updatedAlbum } : a)
  })),

  // Album specific track manipulation functions
  addTrackToAlbum: (albumId, track) => set((state) => {
    const updatedAlbums = state.albumsList.map((album) => {
      if (album.id === albumId) {
        const nextTrackId = album.tracksList.length ? Math.max(...album.tracksList.map(t => t.id)) + 1 : 101
        const newTrack = {
          id: nextTrackId,
          joined: new Date().toISOString().split("T")[0],
          status: "Published",
          ...track
        }
        const newTracks = [...album.tracksList, newTrack]
        // Calculate new tracks count
        return {
          ...album,
          tracksCount: newTracks.length,
          tracksList: newTracks
        }
      }
      return album
    })
    return { albumsList: updatedAlbums }
  }),

  deleteTrackFromAlbum: (albumId, trackId) => set((state) => {
    const updatedAlbums = state.albumsList.map((album) => {
      if (album.id === albumId) {
        const newTracks = album.tracksList.filter(t => t.id !== trackId)
        return {
          ...album,
          tracksCount: newTracks.length,
          tracksList: newTracks
        }
      }
      return album
    })
    return { albumsList: updatedAlbums }
  })
}))
