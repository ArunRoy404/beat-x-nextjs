import { create } from "zustand"
import {
  usersStatsCards,
  usersList
} from "@/dummyData/admin/adminData/adminDashboardUsersData"

export const useAdminDashboardUsersStore = create((set) => ({
  usersStatsCards: usersStatsCards,
  usersList: usersList,
  selectedStatusFilter: "All",
  searchQuery: "",
  currentPage: 1,

  setUsersStatsCards: (cards) => set({ usersStatsCards: cards }),
  setUsersList: (list) => set({ usersList: list }),
  setSelectedStatusFilter: (filter) => set({ selectedStatusFilter: filter }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setCurrentPage: (page) => set({ currentPage: page }),

  addUser: (user) => set((state) => ({
    usersList: [
      {
        id: state.usersList.length ? Math.max(...state.usersList.map(u => u.id)) + 1 : 1,
        avatar: "",
        streams: 0,
        joined: new Date().toISOString().split("T")[0],
        ...user
      },
      ...state.usersList,
    ]
  })),

  deleteUser: (id) => set((state) => ({
    usersList: state.usersList.filter((u) => u.id !== id)
  })),

  updateUser: (updatedUser) => set((state) => ({
    usersList: state.usersList.map((u) => u.id === updatedUser.id ? { ...u, ...updatedUser } : u)
  }))
}))
