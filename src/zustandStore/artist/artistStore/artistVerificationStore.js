import { create } from "zustand"
import {
  verificationStatus,
  verificationTimeline,
  verifiedFeatures
} from "@/dummyData/artist/artistData/artistVerificationData"

export const useArtistVerificationStore = create(() => ({
  verificationStatus: verificationStatus,
  verificationTimeline: verificationTimeline,
  verifiedFeatures: verifiedFeatures,
}))
