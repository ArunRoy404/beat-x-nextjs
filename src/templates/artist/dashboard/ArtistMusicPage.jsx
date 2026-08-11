"use client"

import React from "react"
import { useArtistMusicStore } from "@/zustandStore/artist/artistStore/artistMusicStore"
import DashboardStats from "@/components/shared/Dashboard/DashboardStats/DashboardStats"
import UploadNewSong from "@/components/artist/music/UploadNewSong"
import SongsContainer from "@/components/artist/music/SongsContainer/SongsContainer"

const ArtistMusicPage = () => {
  const statsCards = useArtistMusicStore((state) => state.musicStatsCards)

  return (
    <div className="flex flex-col gap-6 w-full pb-8">
      {/* Upper Stats grid */}
      <DashboardStats statsCards={statsCards} />

      {/* Upload song selector container */}
      <UploadNewSong />

      {/* Songs collection container */}
      <SongsContainer />
    </div>
  )
}

export default ArtistMusicPage
