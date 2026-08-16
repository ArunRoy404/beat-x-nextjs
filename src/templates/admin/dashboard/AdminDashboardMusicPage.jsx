"use client"

import React from "react"
import DashboardStats from "@/components/shared/Dashboard/DashboardStats/DashboardStats"
import UploadNewSong from "@/components/admin/music/UploadNewSong"
import SongsContainer from "@/components/admin/music/SongsContainer/SongsContainer"
import { useSongs } from "@/hooks/api/admin/songs/useSongs"
import { buildSongsParams } from "@/hooks/api/admin/songs/songsParams"

const AdminDashboardMusicPage = () => {
  // Deliberately the global unfiltered total, not whatever's in the URL —
  // "Total Songs" should mean all of them, not just the current filter.
  // Only matches the SSR-prefetched query (zero-spinner) when the URL has no
  // filters; with filters active this fetches client-side, same as genre's
  // stats do when its own search is active.
  const { data: allData } = useSongs(buildSongsParams())

  const statsCards = [
    {
      id: 1,
      title: "Total Songs",
      value: (allData?.total ?? 0).toLocaleString(),
      icon: "Music",
      iconColor: "#3ADFFA",
      iconBg: "rgba(58, 223, 250, 0.15)"
    }
  ]

  return (
    <div className="flex flex-col gap-6 w-full pb-8">
      {/* Upper Stats grid */}
      <DashboardStats statsCards={statsCards} />

      {/* Upload song selector container */}
      <UploadNewSong />

      {/* Songs table / collection container */}
      <SongsContainer />
    </div>
  )
}

export default AdminDashboardMusicPage
