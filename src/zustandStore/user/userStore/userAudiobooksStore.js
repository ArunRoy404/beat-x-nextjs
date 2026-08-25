import { create } from "zustand"
import {
  continueListening,
  bestsellerList,
  genreRefractions,
  newlyNarrated,
} from "@/dummyData/user/userAudiobooksData"

export const useUserAudiobooksStore = create(() => ({
  continueListening,
  bestsellerList,
  genreRefractions,
  newlyNarrated,
}))
