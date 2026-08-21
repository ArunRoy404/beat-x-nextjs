import { create } from "zustand"
import { likedSongsHero, sonicReplay, discoveryPrism, playlists, topArtists, recentAlbums } from "@/dummyData/user/userLibraryData"

export const useUserLibraryStore = create(() => ({
  likedSongsHero,
  sonicReplay,
  discoveryPrism,
  playlists,
  topArtists,
  recentAlbums,
}))
