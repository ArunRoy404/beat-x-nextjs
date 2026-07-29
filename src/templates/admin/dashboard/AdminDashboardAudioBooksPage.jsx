"use client"

import React from "react"
import { useAdminDashboardAudioBooksStore } from "@/zustandStore/admin/adminStore/adminDashboardAudioBooksStore"
import DashboardStats from "@/components/shared/Dashboard/DashboardStats/DashboardStats"
import AudioBooksContainer from "@/components/admin/audiobooks/AudioBooksContainer"
import { Upload } from "lucide-react"

const AdminDashboardAudioBooksPage = () => {
  const statsCards = useAdminDashboardAudioBooksStore((state) => state.audioBooksStatsCards)

  return (
    <div className="flex flex-col gap-6 w-full pb-8">
      {/* Upper Stats grid */}
      <DashboardStats statsCards={statsCards} />

      {/* Upload Audiobook Banner (Visual replica from Image 1) */}
      <div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-[16px] border-dashed border-2 border-secondary/15 bg-secondary/[0.03] gap-4 w-full"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-[12px] bg-secondary/10 border border-secondary/25 flex items-center justify-center text-secondary shrink-0">
            <Upload className="w-5 h-5" />
          </div>
          <div className="flex flex-col gap-1 min-w-0">
            <h2 className="text-whitetext text-[20px] not-italic font-medium leading-none truncate">
              Upload New Podcasts
            </h2>
            <p className="text-white/40 text-[12px] not-italic font-normal truncate mt-0.5">
              MP3 / WAV / FLAC · Max 100MB · Cover art min 1000×1000px
            </p>
          </div>
        </div>

        <button
          onClick={() => alert("Audiobook upload flow is under development.")}
          className="rounded-full bg-gradient-to-r from-secondary to-[#B1FE4D] text-button-text font-semibold hover:opacity-90 transition-opacity border-0 px-5 py-2 cursor-pointer shadow-md flex items-center gap-1.5"
        >
          Upload Podcasts
        </button>
      </div>

      {/* Audiobooks grid container */}
      <AudioBooksContainer />
    </div>
  )
}

export default AdminDashboardAudioBooksPage
