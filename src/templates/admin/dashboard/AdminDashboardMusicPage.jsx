"use client"

import React from "react"
import { useAdminDashboardMusicStore } from "@/zustandStore/admin/adminStore/adminDashboardMusicStore"
import DashboardStats from "@/components/shared/Dashboard/DashboardStats/DashboardStats"
import UploadNewSong from "@/components/admin/music/UploadNewSong"
import SongsContainer from "@/components/admin/music/SongsContainer/SongsContainer"

const AdminDashboardMusicPage = () => {
  const statsCards = useAdminDashboardMusicStore((state) => state.musicStatsCards)
  const songs = useAdminDashboardMusicStore((state) => state.songsList)

  return (
    <div className="flex flex-col gap-6 w-full pb-8">
      {/* Upper Stats grid */}
      <DashboardStats statsCards={statsCards} />

      {/* Upload song selector container */}
      <UploadNewSong />

      {/* Songs collection container */}
      <SongsContainer songs={songs} />
    </div>
  )
}

export default AdminDashboardMusicPage
