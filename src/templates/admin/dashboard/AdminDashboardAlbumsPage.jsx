"use client"

import React from "react"
import { useAdminDashboardAlbumsStore } from "@/zustandStore/admin/adminStore/adminDashboardAlbumsStore"
import DashboardStats from "@/components/shared/Dashboard/DashboardStats/DashboardStats"
import AlbumsContainer from "@/components/admin/albums/AlbumsContainer"

const AdminDashboardAlbumsPage = () => {
  const statsCards = useAdminDashboardAlbumsStore((state) => state.albumsStatsCards)

  return (
    <div className="flex flex-col gap-6 w-full pb-8">
      {/* Upper Stats grid */}
      <DashboardStats statsCards={statsCards} />

      {/* Albums container */}
      <AlbumsContainer />
    </div>
  )
}

export default AdminDashboardAlbumsPage
