import { create } from "zustand"
import { notificationsFilters, notifications } from "@/dummyData/user/userNotificationsData"

export const useUserNotificationsStore = create((set, get) => ({
  notificationsFilters,
  activeFilter: "All",
  notifications,
  setActiveFilter: (activeFilter) => set({ activeFilter }),
  markAllAsRead: () => set((state) => ({ notifications: state.notifications.map((n) => ({ ...n, unread: false })) })),
  getFilteredNotifications: () => {
    const { activeFilter, notifications } = get()
    if (activeFilter === "All") return notifications
    return notifications.filter((n) => n.categoryFilter === activeFilter)
  },
}))
