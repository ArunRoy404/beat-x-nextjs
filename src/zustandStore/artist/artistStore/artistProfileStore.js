import { create } from "zustand"
import {
  artistProfile,
  genreOptions,
  genderOptions,
  languageOptions,
  artistSocialLinks
} from "@/dummyData/artist/artistData/artistProfileData"

export const useArtistProfileStore = create((set) => ({
  artistProfile: artistProfile,
  genreOptions: genreOptions,
  genderOptions: genderOptions,
  languageOptions: languageOptions,
  socialLinks: artistSocialLinks,

  updateArtistProfile: (data) => set((state) => ({
    artistProfile: { ...state.artistProfile, ...data }
  })),

  updateSocialLinks: (data) => set((state) => ({
    socialLinks: { ...state.socialLinks, ...data }
  })),
}))
