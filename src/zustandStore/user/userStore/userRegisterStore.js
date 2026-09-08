import { create } from "zustand"
import { sonicPreferences } from "@/dummyData/user/userRegisterData"

export const useUserRegisterStore = create(() => ({
  sonicPreferences,
}))
