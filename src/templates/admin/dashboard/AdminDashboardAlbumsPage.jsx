"use client"

import React from "react"
import DashboardStats from "@/components/shared/Dashboard/DashboardStats/DashboardStats"
import CreateNewAlbum from "@/components/admin/albums/CreateNewAlbum"
import AlbumsContainer from "@/components/admin/albums/AlbumsContainer"
import { useAlbums } from "@/hooks/api/admin/albums/useAlbums"
import { buildAlbumsParams } from "@/hooks/api/admin/albums/albumsParams"

const AdminDashboardAlbumsPage = () => {
  // Deliberately the global unfiltered total, not whatever's in the URL —
  // "Total Albums" should mean all of them, not just the current filter.
  // Only matches the SSR-prefetched query (zero-spinner) when the URL has no
  // filters; with filters active this fetches client-side, same as genre's
  // stats do when its own search is active.
  const { data: allData } = useAlbums(buildAlbumsParams())

  const statsCards = [
    {
      id: 1,
      title: "Total Albums",
      value: (allData?.total ?? 0).toLocaleString(),
      icon: "Disc3",
      iconColor: "#3ADFFA",
      iconBg: "rgba(58, 223, 250, 0.15)"
    }
  ]

  return (
    <div className="flex flex-col gap-6 w-full pb-8">
      {/* Upper Stats grid */}
      <DashboardStats statsCards={statsCards} />

      {/* Create album selector container */}
      <CreateNewAlbum />

      {/* Albums table / collection container */}
      <AlbumsContainer />
    </div>
  )
}

export default AdminDashboardAlbumsPage
