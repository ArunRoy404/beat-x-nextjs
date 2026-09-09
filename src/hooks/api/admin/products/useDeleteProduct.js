import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { deleteProductRequest } from "@/services/admin/productsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useDeleteProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteProductRequest,
    onSuccess: (_data, productId) => {
      toast.success("Product deleted successfully!")
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all })
      if (productId) {
        queryClient.removeQueries({ queryKey: queryKeys.products.detail(productId) })
      }
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || err?.message || "Failed to delete product")
    },
  })
}

