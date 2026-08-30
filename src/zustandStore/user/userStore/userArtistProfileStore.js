import { create } from "zustand"
import { artistProfiles } from "@/dummyData/user/userArtistProfileData"

export const ARTIST_PROFILE_TABS = ["Songs", "Products", "Podcast"]

export const useUserArtistProfileStore = create((set) => ({
    activeTab: ARTIST_PROFILE_TABS[0],
    setActiveTab: (tab) => set({ activeTab: tab }),
    getArtistBySlug: (slug) => artistProfiles[slug] ?? null,
}))
