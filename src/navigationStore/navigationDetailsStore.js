import { create } from "zustand"
import { navigationDetails } from "@/navigationData/navigationDetails"

export const useNavigationDetailsStore = create((set) => ({
  navigationDetails: navigationDetails,
  setNavigationDetails: (details) => set({ navigationDetails: details }),
}))
