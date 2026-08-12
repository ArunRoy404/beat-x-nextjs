import { create } from "zustand"
import {
  productStatsCards,
  productPerformanceData,
  productPlatformData,
  productCountryData
} from "@/dummyData/artist/artistData/artistProductDetailsAnalyticsData"

export const useArtistProductDetailsAnalyticsStore = create((set) => ({
  productStatsCards: productStatsCards,
  productPerformanceData: productPerformanceData,
  productPlatformData: productPlatformData,
  productCountryData: productCountryData,
}))
