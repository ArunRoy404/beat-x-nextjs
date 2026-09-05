"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProductRequest } from "@/services/admin/productsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useUpdateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateProductRequest,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all })
      if (variables?.id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.products.detail(variables.id) })
      }
    },
  })
}
