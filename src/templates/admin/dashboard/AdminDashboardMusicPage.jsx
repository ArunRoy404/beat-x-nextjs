"use client"

import React from "react"
import { useAdminDashboardMusicStore } from "@/zustandStore/admin/adminStore/adminDashboardMusicStore"
import DashboardStats from "@/components/shared/Dashboard/DashboardStats/DashboardStats"
import UploadNewSong from "@/components/admin/dashboard/Music/UploadNewSong"
import SongsTable from "@/components/admin/dashboard/Music/SongsTable"

const AdminDashboardMusicPage = () => {
  const statsCards = useAdminDashboardMusicStore((state) => state.musicStatsCards)
  const songs = useAdminDashboardMusicStore((state) => state.songsList)

  return (
    <div className="flex flex-col gap-6 w-full pb-8">
      {/* Upper Stats grid */}
      <DashboardStats statsCards={statsCards} />

      {/* Upload song selector container */}
      <UploadNewSong />

      {/* Songs collection list table */}
      <SongsTable songs={songs} />
    </div>
  )
}

export default AdminDashboardMusicPage
