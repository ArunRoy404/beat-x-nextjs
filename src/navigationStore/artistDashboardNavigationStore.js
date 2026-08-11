import { create } from "zustand"
import { artistDashboardNavigation } from "@/navigationData/artistDashboardNavigation"

export const useArtistDashboardNavigationStore = create((set) => ({
  navigationData: artistDashboardNavigation,
  setNavigationData: (data) => set({ navigationData: data }),
}))
