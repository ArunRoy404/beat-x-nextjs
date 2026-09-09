import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { updateProductRequest } from "@/services/admin/productsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

export function useUpdateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateProductRequest,
    onSuccess: (_data, variables) => {
      if (variables?.data?.status === "active") {
        toast.success("Product approved successfully!")
      } else if (variables?.data?.status === "rejected") {
        toast.error("Product rejected.")
      } else {
        toast.success("Product updated successfully!")
      }
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all })
      if (variables?.id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.products.detail(variables.id) })
      }
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || err?.message || "Failed to update product")
    },
  })
}

