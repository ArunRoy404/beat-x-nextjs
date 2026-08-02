"use client"

import React, { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import VideoDetailHeader from "@/components/admin/videos/VideoDetails/VideoDetailHeader"
import VideoDetailsTabs from "@/components/admin/videos/VideoDetails/VideoDetailsTabs"
import VideoDetailFooter from "@/components/admin/videos/VideoDetails/VideoDetailFooter"

const VideoDetailsDialog = ({ video, children }) => {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className="sm:max-w-[672px] p-0 overflow-hidden flex flex-col max-h-[95vh] border-white/10 bg-[#1A1A19]">
                <DialogTitle className="sr-only">
                    Video Details - {video?.title || "Unknown"}
                </DialogTitle>

                {/* Video Header & Player */}
                <VideoDetailHeader video={video} />

                {/* Details / Analytics Tabs */}
                <VideoDetailsTabs video={video} />

                {/* Action Buttons Footer */}
                <VideoDetailFooter video={video} />
            </DialogContent>
        </Dialog>
    )
}

export default VideoDetailsDialog
