"use client"

import React from "react"
import { useAdminDashboardArtistsStore } from "@/zustandStore/admin/adminStore/adminDashboardArtistsStore"
import DashboardStats from "@/components/shared/Dashboard/DashboardStats/DashboardStats"
import AddNewArtist from "@/components/admin/artists/AddNewArtist"
import ArtistsContainer from "@/components/admin/artists/ArtistsContainer"

const AdminDashboardArtistsPage = () => {
  const statsCards = useAdminDashboardArtistsStore((state) => state.artistsStatsCards)

  return (
    <div className="flex flex-col gap-6 w-full pb-8">
      {/* Upper Stats grid */}
      <DashboardStats statsCards={statsCards} />

      {/* Register new artist banner */}
      <AddNewArtist />

      {/* Artists table & actions container */}
      <ArtistsContainer />
    </div>
  )
}

export default AdminDashboardArtistsPage
