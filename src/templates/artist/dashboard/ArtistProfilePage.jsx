"use client"

import React from "react"
import { useArtistProfileStore } from "@/zustandStore/artist/artistStore/artistProfileStore"
import ArtistProfileHero from "@/components/artist/profile/ArtistProfileHero"
import ArtistInformationForm from "@/components/artist/profile/ArtistInformationForm"
import ArtistSocialLinksForm from "@/components/artist/profile/ArtistSocialLinksForm"

const ArtistProfilePage = () => {
  const artistProfile = useArtistProfileStore((state) => state.artistProfile)

  return (
    <div className="flex flex-col gap-6 w-full pb-8">
      <ArtistProfileHero profile={artistProfile} />
      <ArtistInformationForm />
      <ArtistSocialLinksForm />
    </div>
  )
}

export default ArtistProfilePage
