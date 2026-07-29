import { create } from "zustand"
import {
  audioBooksStatsCards,
  audioBooksList
} from "@/dummyData/admin/adminData/adminDashboardAudioBooksData"

export const useAdminDashboardAudioBooksStore = create((set) => ({
  audioBooksStatsCards: audioBooksStatsCards,
  audioBooksList: audioBooksList,
  setAudioBooksStatsCards: (cards) => set({ audioBooksStatsCards: cards }),
  setAudioBooksList: (list) => set({ audioBooksList: list }),
  deleteAudioBook: (id) => set((state) => ({
    audioBooksList: state.audioBooksList.filter((book) => book.id !== id)
  })),
  updateAudioBook: (id, updatedBook) => set((state) => ({
    audioBooksList: state.audioBooksList.map((book) => {
      if (book.id === id) {
        return {
          ...book,
          ...updatedBook
        }
      }
      return book
    })
  }))
}))
