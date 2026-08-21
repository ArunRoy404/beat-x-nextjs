import { create } from "zustand"
import {
  videoCategories,
  watchHero,
  liveNow,
  videos,
  upNextVideos,
  queueMiniItem,
  upcomingReminders,
  weeklyTopCharts,
  proFeaturePromo,
} from "@/dummyData/user/userWatchData"

export const useUserWatchStore = create(() => ({
  videoCategories,
  watchHero,
  liveNow,
  videos,
  upNextVideos,
  queueMiniItem,
  upcomingReminders,
  weeklyTopCharts,
  proFeaturePromo,
}))
