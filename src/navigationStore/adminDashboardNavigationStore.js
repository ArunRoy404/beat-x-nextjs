import { create } from "zustand"
import { adminDashboardNavigation } from "@/navigationData/adminDashboardNavigation"

export const useAdminDashboardNavigationStore = create((set) => ({
  navigationData: adminDashboardNavigation,
  setNavigationData: (data) => set({ navigationData: data }),
}))
