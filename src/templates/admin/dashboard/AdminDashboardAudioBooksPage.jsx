"use client"

import React from "react"
import DashboardStats from "@/components/shared/Dashboard/DashboardStats/DashboardStats"
import AudioBooksContainer from "@/components/admin/audiobooks/AudioBooksContainer"
import { useAudioBooks, DEFAULT_AUDIOBOOKS_PARAMS } from "@/hooks/api/admin/audiobooks/useAudioBooks"

const AdminDashboardAudioBooksPage = () => {
  // Only reads the same query the SSR page already prefetched — an extra,
  // un-prefetched query here would have to fetch client-side after mount
  // and show a loading state, unlike genre's single-query stats pattern.
  const { data: allData } = useAudioBooks(DEFAULT_AUDIOBOOKS_PARAMS)

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
