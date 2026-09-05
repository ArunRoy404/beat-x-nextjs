import { create } from "zustand"
import { albumsSummary, recentlyPlayedAlbums, featuredFavoriteAlbum, favoriteAlbums } from "@/dummyData/user/userAlbumsData"

export const useUserAlbumsStore = create(() => ({
  albumsSummary,
  recentlyPlayedAlbums,
  featuredFavoriteAlbum,
  favoriteAlbums,
}))
