"use client"

import React from "react"
import FollowersHeroCard from "@/components/artist/followers/FollowersHeroCard"
import FollowerGrowthChart from "@/components/artist/followers/FollowerGrowthChart"
import StreamsPerTrack from "@/components/artist/followers/StreamsPerTrack"

const ArtistFollowersPage = () => {
  return (
    <div className="flex flex-col gap-6 w-full pb-8">
      {/* Total Followers hero card */}
      <FollowersHeroCard />

      {/* Growth chart + Streams per track */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <FollowerGrowthChart />
        <StreamsPerTrack />
      </div>
    </div>
  )
}

export default ArtistFollowersPage
