"use client"

import { useQuery } from "@tanstack/react-query"
import { getProductsDashboardStatsRequest } from "@/services/admin/productsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useProductsDashboard() {
  return useQuery({
    queryKey: queryKeys.products.dashboard(),
    queryFn: getProductsDashboardStatsRequest,
  })
}
