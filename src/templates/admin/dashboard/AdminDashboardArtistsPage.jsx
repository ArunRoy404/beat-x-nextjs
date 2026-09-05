"use client"

import React from "react"
import AddNewArtist from "@/components/admin/artists/AddNewArtist"
import ArtistsContainer from "@/components/admin/artists/ArtistsContainer"

const AdminDashboardArtistsPage = () => {
  return (
    <div className="flex flex-col gap-6 w-full pb-8">
      {/* Register new artist banner */}
      <AddNewArtist />

      {/* Artists table & actions container */}
      <ArtistsContainer />
    </div>
  )
}

export default AdminDashboardArtistsPage
