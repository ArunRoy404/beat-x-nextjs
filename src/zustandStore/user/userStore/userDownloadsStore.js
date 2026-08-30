import { create } from "zustand"
import { storageUsage, recommendedDownload, downloadsFilters, downloadedItems, smartDownloads } from "@/dummyData/user/userDownloadsData"

export const useUserDownloadsStore = create((set, get) => ({
  storageUsage,
  recommendedDownload,
  downloadsFilters,
  activeFilter: "All",
  downloadedItems,
  smartDownloads,
  setActiveFilter: (activeFilter) => set({ activeFilter }),
  getFilteredItems: () => {
    const { activeFilter, downloadedItems } = get()
    if (activeFilter === "All") return downloadedItems
    const singular = activeFilter.replace(/s$/, "")
    return downloadedItems.filter((item) => item.type === singular || item.type === activeFilter)
  },
}))
