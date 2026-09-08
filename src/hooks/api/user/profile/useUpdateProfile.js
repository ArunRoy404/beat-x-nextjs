"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateMyProfileRequest } from "@/services/user/profileServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 *   const { mutate: updateProfile, isPending } = useUpdateProfile()
 *   updateProfile(formData, { onSuccess, onError })
 */
export function useUpdateProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateMyProfileRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.me() })
    },
  })
}
