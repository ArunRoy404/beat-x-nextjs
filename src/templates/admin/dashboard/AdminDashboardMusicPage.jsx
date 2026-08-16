"use client"

import React from "react"
import DashboardStats from "@/components/shared/Dashboard/DashboardStats/DashboardStats"
import SongsContainer from "@/components/admin/music/SongsContainer/SongsContainer"
import { useSongs, DEFAULT_SONGS_PARAMS } from "@/hooks/api/admin/songs/useSongs"

const AdminDashboardMusicPage = () => {
  const { data: allData } = useSongs(DEFAULT_SONGS_PARAMS)
  const { data: activeData } = useSongs({ page: 1, limit: 1, status: "active" })

  const statsCards = [
    {
      id: 1,
      title: "Total Songs",
      value: (allData?.total ?? 0).toLocaleString(),
      icon: "Music",
      iconColor: "#3ADFFA",
      iconBg: "rgba(58, 223, 250, 0.15)"
    },
    {
      id: 2,
      title: "Active",
      value: (activeData?.total ?? 0).toLocaleString(),
      icon: "CheckCircle",
      iconColor: "#34C759",
      iconBg: "rgba(52, 199, 89, 0.15)"
    }
  ]

  return (
    <div className="flex flex-col gap-6 w-full pb-8">
      {/* Upper Stats grid */}
      <DashboardStats statsCards={statsCards} />

      {/* Songs table / collection container */}
      <SongsContainer />
    </div>
  )
}

export default AdminDashboardMusicPage
