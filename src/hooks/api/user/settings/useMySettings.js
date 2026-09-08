"use client"

import { useQuery } from "@tanstack/react-query"
import { getMySettingsRequest } from "@/services/user/settingsServices"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

/** The signed-in listener's app settings (GET /users/settings). */
export function useMySettings() {
  return useQuery({
    queryKey: queryKeys.user.settings(),
    queryFn: getMySettingsRequest,
  })
}
