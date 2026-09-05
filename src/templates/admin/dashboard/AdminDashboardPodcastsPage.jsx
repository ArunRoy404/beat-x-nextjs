"use client"

import React from "react"
import DashboardStats from "@/components/shared/Dashboard/DashboardStats/DashboardStats"
import UploadNewPodcast from "@/components/admin/podcasts/UploadNewPodcast"
import PodcastsContainer from "@/components/admin/podcasts/PodcastsContainer/PodcastsContainer"
import { usePodcasts } from "@/hooks/api/admin/podcasts/usePodcasts"
import { buildPodcastsParams } from "@/hooks/api/admin/podcasts/podcastsParams"

const AdminDashboardPodcastsPage = () => {
  // Deliberately the global unfiltered total, not whatever's in the URL —
  // "Total Podcasts" should mean all of them, not just the current filter.
  // Only matches the SSR-prefetched query (zero-spinner) when the URL has no
  // filters; with filters active this fetches client-side, same as genre's
  // stats do when its own search is active.
  const { data: allData } = usePodcasts(buildPodcastsParams())

  const statsCards = [
    {
      id: 1,
      title: "Total Podcasts",
      value: (allData?.total ?? 0).toLocaleString(),
      icon: "Radio",
      iconColor: "#3ADFFA",
      iconBg: "rgba(58, 223, 250, 0.15)"
    }
  ]

  return (
    <div className="flex flex-col gap-6 w-full pb-8">
      {/* Upper Stats grid */}
      <DashboardStats statsCards={statsCards} />

      {/* Upload podcast selector container */}
      <UploadNewPodcast />

      {/* Podcasts table / collection container */}
      <PodcastsContainer />
    </div>
  )
}

export default AdminDashboardPodcastsPage
