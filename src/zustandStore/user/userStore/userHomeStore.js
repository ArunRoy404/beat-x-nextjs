import { create } from "zustand"
import { heroContent, mixes, newReleases, recommendedArtists, dailyRadar } from "@/dummyData/user/userHomeData"

export const useUserHomeStore = create(() => ({
  heroContent,
  mixes,
  newReleases,
  recommendedArtists,
  dailyRadar,
}))
