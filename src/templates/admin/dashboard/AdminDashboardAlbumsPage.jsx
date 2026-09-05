"use client"

import React from "react"
import DashboardStats from "@/components/shared/Dashboard/DashboardStats/DashboardStats"
import CreateNewAlbum from "@/components/admin/albums/CreateNewAlbum"
import AlbumsContainer from "@/components/admin/albums/AlbumsContainer"
import { useAlbums } from "@/hooks/api/admin/albums/useAlbums"
import { buildAlbumsParams } from "@/hooks/api/admin/albums/albumsParams"
import { useUrlListParams } from "@/hooks/useUrlListParams"

const AdminDashboardAlbumsPage = () => {
  const { get } = useUrlListParams()
  const selectedStatus = get("status", "all")
  const selectedGenre = get("genre", "all")
  const urlSearch = get("q", "")
  const currentPage = Number(get("page", "1")) || 1

  const params = buildAlbumsParams({
    status: selectedStatus,
    genre: selectedGenre,
    q: urlSearch,
    page: currentPage,
  })

  const { data: allData } = useAlbums(params)

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
