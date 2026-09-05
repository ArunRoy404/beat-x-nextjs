"use client"

import { useQuery } from "@tanstack/react-query"
import { getProductsRequest } from "@/services/admin/productsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useProducts(params) {
  return useQuery({
    queryKey: queryKeys.products.list(params),
    queryFn: () => getProductsRequest(params),
  })
}
