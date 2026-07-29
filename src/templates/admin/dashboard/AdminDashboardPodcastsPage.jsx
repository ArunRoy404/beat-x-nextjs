"use client"

import React from "react"
import { useAdminDashboardPodcastsStore } from "@/zustandStore/admin/adminStore/adminDashboardPodcastsStore"
import DashboardStats from "@/components/shared/Dashboard/DashboardStats/DashboardStats"
import UploadNewPodcast from "@/components/admin/podcasts/UploadNewPodcast"
import PodcastsContainer from "@/components/admin/podcasts/PodcastsContainer/PodcastsContainer"

const AdminDashboardPodcastsPage = () => {
  const statsCards = useAdminDashboardPodcastsStore((state) => state.podcastsStatsCards)

  return (
    <div className="flex flex-col gap-6 w-full pb-8">
      {/* Upper Stats grid */}
      <DashboardStats statsCards={statsCards} />

      {/* Upload podcast selector container */}
      <UploadNewPodcast />

      {/* Podcasts collection container */}
      <PodcastsContainer />
    </div>
  )
}

export default AdminDashboardPodcastsPage
