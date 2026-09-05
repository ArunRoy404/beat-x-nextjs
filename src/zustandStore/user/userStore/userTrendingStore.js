import { create } from "zustand"
import {
  trendingHeroSlides,
  hotAlbums,
  recentSearches,
  trendingVideos,
  globalTop50,
} from "@/dummyData/user/userTrendingData"

export const useUserTrendingStore = create(() => ({
  trendingHeroSlides,
  hotAlbums,
  recentSearches,
  trendingVideos,
  globalTop50,
}))
