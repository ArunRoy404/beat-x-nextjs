"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { updateMyProfileRequest } from "@/services/user/profileServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 *   const { mutate: updateProfile, isPending } = useUpdateProfile()
 *   updateProfile(formData, { onSuccess })
 */
export function useUpdateProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateMyProfileRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.me() })
      toast.success("Profile updated successfully!")
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to update your profile.")
    },
  })
}
