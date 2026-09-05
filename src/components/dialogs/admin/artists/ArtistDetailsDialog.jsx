"use client"

import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Spinner } from "@/components/ui/spinner"
import { useArtistDetail } from "@/hooks/api/admin/artists/useArtistDetail"
import ArtistDetailHeader from "@/components/admin/artists/ArtistDetails/ArtistDetailHeader"
import ArtistDetailsTabs from "@/components/admin/artists/ArtistDetails/ArtistDetailsTabs"
import ArtistDetailFooter from "@/components/admin/artists/ArtistDetails/ArtistDetailFooter"

const formatFollowers = (val) => {
  if (!val) return "0"
  if (val >= 1000000) return `${(val / 1000000).toFixed(1).replace(/\.0$/, "")}M`
  if (val >= 1000) return `${(val / 1000).toFixed(1).replace(/\.0$/, "")}K`
  return val.toString()
}

const formatStreams = (val) => {
  if (!val) return "0"
  if (val >= 1000000) return `${(val / 1000000).toFixed(1).replace(/\.0$/, "")}M`
  if (val >= 1000) return `${(val / 1000).toFixed(1).replace(/\.0$/, "")}K`
  return val.toString()
}

const formatRevenue = (val) => {
  if (!val) return "৳0"
  if (val >= 1000000) return `৳${(val / 1000000).toFixed(1).replace(/\.0$/, "")}M`
  if (val >= 1000) return `৳${(val / 1000).toFixed(1).replace(/\.0$/, "")}K`
  return `৳${val.toString()}`
}

const ArtistDetailsDialog = ({ artist: summary, children }) => {
  const [open, setOpen] = useState(false)
  const { data: detail, isLoading } = useArtistDetail(open ? summary?._id : undefined)
  const artist = detail || summary

  const artistName =
    artist?.personalInfo?.stageName ||
    artist?.personalInfo?.fullName ||
    artist?.user?.name ||
    artist?.userId?.name ||
    artist?.name ||
    "Unknown Artist"

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[672px] p-0 overflow-hidden flex flex-col max-h-[95vh]" showCloseButton={false}>
        {/* Screen reader only title for accessibility compliance */}
        <DialogTitle className="sr-only">
          Artist Details - {artistName}
        </DialogTitle>

        {isLoading && !detail ? (
          <div className="flex items-center justify-center py-20">
            <Spinner className="size-6 text-secondary" />
          </div>
        ) : (
          <>
            {/* Header */}
            <ArtistDetailHeader artist={artist} onClose={() => setOpen(false)} />

            {/* Short Summary Stats Grid */}
            <div className="grid grid-cols-4 gap-4 px-6 py-4 bg-[#141414] border-b border-white/5 text-center shrink-0">
              <div className="flex flex-col gap-1">
                <span className="text-[20px] font-bold text-whitetext font-sans leading-none">
                  {artist?.songsCount ?? 0}
                </span>
                <span className="text-[11px] font-medium text-light-gray/40 uppercase tracking-wider">
                  Songs
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[20px] font-bold text-whitetext font-sans leading-none">
                  {formatStreams(artist?.streams)}
                </span>
                <span className="text-[11px] font-medium text-light-gray/40 uppercase tracking-wider">
                  Streams
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[20px] font-bold text-whitetext font-sans leading-none">
                  {formatFollowers(artist?.followers)}
                </span>
                <span className="text-[11px] font-medium text-light-gray/40 uppercase tracking-wider">
                  Followers
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[20px] font-bold text-[#3ADFFA] font-sans leading-none">
                  {formatRevenue(artist?.revenue)}
                </span>
                <span className="text-[11px] font-medium text-light-gray/40 uppercase tracking-wider">
                  Revenue
                </span>
              </div>
            </div>

            {/* Switchable Tabs */}
            <ArtistDetailsTabs artist={artist} />

            {/* Footer controls */}
            <ArtistDetailFooter artist={artist} onClose={() => setOpen(false)} />
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default ArtistDetailsDialog

