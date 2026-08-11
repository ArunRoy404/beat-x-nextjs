"use client"

import React from "react"
import { useArtistPodcastsStore } from "@/zustandStore/artist/artistStore/artistPodcastsStore"
import DashboardStats from "@/components/shared/Dashboard/DashboardStats/DashboardStats"
import UploadNewPodcast from "@/components/artist/podcasts/UploadNewPodcast"
import PodcastsContainer from "@/components/artist/podcasts/PodcastsContainer/PodcastsContainer"

const ArtistPodcastsPage = () => {
  const statsCards = useArtistPodcastsStore((state) => state.podcastsStatsCards)

  return (
    <div className="flex flex-col gap-6 w-full pb-8">
      {/* Upper Stats grid */}
      <DashboardStats statsCards={statsCards} />

      {/* Upload podcast selector container */}
      <UploadNewPodcast />

      {/* Podcasts collection container */}
      <PodcastsContainer />
    </div>
  )
}

export default ArtistPodcastsPage
