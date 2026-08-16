"use client"

import React from "react"
import DashboardStats from "@/components/shared/Dashboard/DashboardStats/DashboardStats"
import AudioBooksContainer from "@/components/admin/audiobooks/AudioBooksContainer"
import { useAudioBooks, DEFAULT_AUDIOBOOKS_PARAMS } from "@/hooks/api/admin/audiobooks/useAudioBooks"

const AdminDashboardAudioBooksPage = () => {
  const { data: allData } = useAudioBooks(DEFAULT_AUDIOBOOKS_PARAMS)
  const { data: activeData } = useAudioBooks({ page: 1, limit: 1, status: "active" })

  const statsCards = [
    {
      id: 1,
      title: "Total Audiobooks",
      value: (allData?.total ?? 0).toLocaleString(),
      icon: "BookOpen",
      iconColor: "#3ADFFA",
      iconBg: "rgba(58, 223, 250, 0.15)"
    },
    {
      id: 2,
      title: "Active",
      value: (activeData?.total ?? 0).toLocaleString(),
      icon: "CheckCircle",
      iconColor: "#34C759",
      iconBg: "rgba(52, 199, 89, 0.15)"
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
