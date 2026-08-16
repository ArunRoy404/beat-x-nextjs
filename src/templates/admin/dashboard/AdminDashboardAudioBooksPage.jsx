"use client"

import React from "react"
import DashboardStats from "@/components/shared/Dashboard/DashboardStats/DashboardStats"
import AudioBooksContainer from "@/components/admin/audiobooks/AudioBooksContainer"
import { useAudioBooks } from "@/hooks/api/admin/audiobooks/useAudioBooks"
import { buildAudioBooksParams } from "@/hooks/api/admin/audiobooks/audioBooksParams"

const AdminDashboardAudioBooksPage = () => {
  // Deliberately the global unfiltered total, not whatever's in the URL —
  // "Total Audiobooks" should mean all of them, not just the current filter.
  // Only matches the SSR-prefetched query (zero-spinner) when the URL has no
  // filters; with filters active this fetches client-side, same as genre's
  // stats do when its own search is active.
  const { data: allData } = useAudioBooks(buildAudioBooksParams())

  const statsCards = [
    {
      id: 1,
      title: "Total Audiobooks",
      value: (allData?.total ?? 0).toLocaleString(),
      icon: "BookOpen",
      iconColor: "#3ADFFA",
      iconBg: "rgba(58, 223, 250, 0.15)"
    }
  ]

  return (
    <div className="flex flex-col gap-6 w-full pb-8">
      {/* Upper Stats grid */}
      <DashboardStats statsCards={statsCards} />

      {/* Audiobooks grid container */}
      <AudioBooksContainer />
    </div>
  )
}

export default AdminDashboardAudioBooksPage
