import { create } from "zustand"
import { genreFilters, exploreHero, genres, recentSearches, liveSessions } from "@/dummyData/user/userExploreData"

export const useUserExploreStore = create(() => ({
  genreFilters,
  exploreHero,
  genres,
  recentSearches,
  liveSessions,
}))
