import { create } from "zustand"
import { userProfileData } from "@/dummyData/user/userProfileData"

export const useUserProfileStore = create(() => ({
  profile: userProfileData,
}))
