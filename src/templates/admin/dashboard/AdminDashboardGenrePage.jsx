"use client"

import React from "react"
import { useAdminDashboardGenreStore } from "@/zustandStore/admin/adminStore/adminDashboardGenreStore"
import DashboardStats from "@/components/shared/Dashboard/DashboardStats/DashboardStats"
import GenreContentTypesOverview from "@/components/admin/genre/GenreContentTypesOverview"
import GenresContainer from "@/components/admin/genre/GenresContainer"

const AdminDashboardGenrePage = () => {
  const statsCards = useAdminDashboardGenreStore((state) => state.genreStatsCards)

  return (
    <div className="flex flex-col gap-6 w-full pb-8">
      {/* Upper Stats grid */}
      <DashboardStats statsCards={statsCards} />

      {/* Middle Cards (Content Types Overview) */}
      <GenreContentTypesOverview />

      {/* Genres collection container */}
      <GenresContainer />
    </div>
  )
}

export default AdminDashboardGenrePage
