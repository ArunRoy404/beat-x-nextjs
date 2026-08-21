import { create } from "zustand"
import { podcastHero, podcastVibes, trendingRefractions } from "@/dummyData/user/userPodcastsData"

export const useUserPodcastsStore = create(() => ({
  podcastHero,
  podcastVibes,
  trendingRefractions,
}))
