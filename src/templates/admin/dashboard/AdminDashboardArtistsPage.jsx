"use client"

import React from "react"
import ArtistsContainer from "@/components/admin/artists/ArtistsContainer"

const AdminDashboardArtistsPage = () => {
  return (
    <div className="flex flex-col gap-6 w-full pb-8">
      {/* Artists table, stats & actions container */}
      <ArtistsContainer />
    </div>
  )
}

export default AdminDashboardArtistsPage

