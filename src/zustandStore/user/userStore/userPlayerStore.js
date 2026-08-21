import { create } from "zustand"
import { userPlayerData } from "@/dummyData/user/userPlayerData"

export const useUserPlayerStore = create((set) => ({
  ...userPlayerData,
  toggleLiked: () => set((state) => ({ liked: !state.liked })),
}))
