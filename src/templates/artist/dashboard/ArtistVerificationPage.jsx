"use client"

import React from "react"
import { useArtistVerificationStore } from "@/zustandStore/artist/artistStore/artistVerificationStore"
import VerifiedArtistBanner from "@/components/artist/verification/VerifiedArtistBanner"
import VerificationTimeline from "@/components/artist/verification/VerificationTimeline"
import VerifiedFeaturesGrid from "@/components/artist/verification/VerifiedFeaturesGrid"

const ArtistVerificationPage = () => {
  const verificationStatus = useArtistVerificationStore((state) => state.verificationStatus)
  const verificationTimeline = useArtistVerificationStore((state) => state.verificationTimeline)
  const verifiedFeatures = useArtistVerificationStore((state) => state.verifiedFeatures)

  return (
    <div className="flex flex-col gap-6 w-full pb-8">
      <VerifiedArtistBanner status={verificationStatus} />
      <VerificationTimeline timeline={verificationTimeline} />
      <VerifiedFeaturesGrid features={verifiedFeatures} />
    </div>
  )
}

export default ArtistVerificationPage
