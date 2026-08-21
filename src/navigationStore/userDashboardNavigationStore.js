import { create } from "zustand"
import { userDashboardNavigation } from "@/navigationData/userDashboardNavigation"

export const useUserDashboardNavigationStore = create((set) => ({
  navigationData: userDashboardNavigation,
  setNavigationData: (data) => set({ navigationData: data }),
}))
