import { create } from "zustand"
import {
  followersStats,
  followerGrowthData,
  streamsPerTrack
} from "@/dummyData/artist/artistData/artistFollowersData"

export const useArtistFollowersStore = create(() => ({
  followersStats: followersStats,
  followerGrowthData: followerGrowthData,
  streamsPerTrack: streamsPerTrack,
}))
