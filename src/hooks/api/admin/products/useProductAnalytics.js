"use client"

import { useQuery } from "@tanstack/react-query"
import { getProductAnalyticsRequest } from "@/services/admin/productsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useProductAnalytics(productId) {
  return useQuery({
    queryKey: queryKeys.products.analytics(productId),
    queryFn: () => getProductAnalyticsRequest(productId),
    enabled: Boolean(productId),
  })
}
