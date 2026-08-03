import { create } from "zustand"
import {
  productStatsCards,
  productPerformanceData,
  productPlatformData,
  productCountryData
} from "@/dummyData/admin/adminData/productDetailsAnalyticsData"

export const useProductDetailsAnalyticsStore = create((set) => ({
  productStatsCards: productStatsCards,
  productPerformanceData: productPerformanceData,
  productPlatformData: productPlatformData,
  productCountryData: productCountryData,
}))
