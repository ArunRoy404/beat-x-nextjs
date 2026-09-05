"use client"

import { useQuery } from "@tanstack/react-query"
import { getProductDetailRequest } from "@/services/admin/productsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useProductDetail(productId) {
  return useQuery({
    queryKey: queryKeys.products.detail(productId),
    queryFn: () => getProductDetailRequest(productId),
    enabled: Boolean(productId),
  })
}
