import { create } from "zustand"
import { exploreArtists } from "@/dummyData/user/userExploreArtistsData"

export const useUserExploreArtistsStore = create(() => ({
    artists: exploreArtists,
}))
