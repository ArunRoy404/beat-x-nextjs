"use client"

import React from "react"
import { useArtistAlbumsStore } from "@/zustandStore/artist/artistStore/artistAlbumsStore"
import DashboardStats from "@/components/shared/Dashboard/DashboardStats/DashboardStats"
import CreateNewAlbum from "@/components/artist/albums/CreateNewAlbum"
import AlbumsContainer from "@/components/artist/albums/AlbumsContainer"

const ArtistAlbumsPage = () => {
  const statsCards = useArtistAlbumsStore((state) => state.albumsStatsCards)

  return (
    <div className="flex flex-col gap-6 w-full pb-8">
      {/* Upper Stats grid */}
      <DashboardStats statsCards={statsCards} />

      {/* Create album selector container */}
      <CreateNewAlbum />

      {/* Albums collection container */}
      <AlbumsContainer />
    </div>
  )
}

export default ArtistAlbumsPage
