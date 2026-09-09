"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { updateMySettingsRequest } from "@/services/user/settingsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 *   const { mutate: updateSettings, isPending } = useUpdateSettings()
 *   updateSettings({ allowSms: true })
 *
 * `/users/me` also embeds a `settings` object, so both are invalidated.
 */
export function useUpdateSettings() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateMySettingsRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.settings() })
      queryClient.invalidateQueries({ queryKey: queryKeys.user.me() })
      toast.success("Preferences updated")
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || "Could not update your preferences.")
    },
  })
}
