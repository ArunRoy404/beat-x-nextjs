"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteProductRequest } from "@/services/admin/productsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useDeleteProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteProductRequest,
    onSuccess: (_data, productId) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all })
      if (productId) {
        queryClient.removeQueries({ queryKey: queryKeys.products.detail(productId) })
      }
    },
  })
}
