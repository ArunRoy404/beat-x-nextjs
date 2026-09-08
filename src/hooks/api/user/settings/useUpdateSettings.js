"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateMySettingsRequest } from "@/services/user/settingsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/**
 *   const { mutate: updateSettings, isPending } = useUpdateSettings()
 *   updateSettings({ allowSms: true }, { onSuccess, onError })
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
    },
  })
}
