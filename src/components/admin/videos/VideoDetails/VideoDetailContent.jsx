"use client"

import React from "react"
import { format } from "date-fns"
import InfoBox from "./InfoBox"
import { formatDurationMs } from "@/lib/format/formatDuration"

const VideoDetailContent = ({ video }) => {
    const ownerName = video?.ownerId?.name || video?.artist || "Admin"
    const genreName = video?.genre?.name || (typeof video?.genre === "string" ? video.genre : "-")
    const formattedDate = video?.publishedAt ? format(new Date(video.publishedAt), "MMM d, yyyy") : "-"

    return (
        /* Scrollable Body Content */
        <div className="p-4 flex flex-col gap-5 overflow-y-auto flex-1 min-h-0 scrollbar-thin">
            <div className="grid grid-cols-2 gap-4">
                
                {/* Info Boxes */}
                <InfoBox label="Uploader / Artist" value={ownerName} />
                <InfoBox label="Genre" value={genreName} />
                <InfoBox label="Published Date" value={formattedDate} />
                <InfoBox label="Transcode Status" value={video?.transcodeStatus || "ready"} />
                <InfoBox label="Total Duration" value={formatDurationMs(video?.durationMs)} />
                <InfoBox label="Featured" value={video?.isFeatured ? "Yes" : "No"} />

                {/* Description / Synopsis (Full Width) */}
                <div className="col-span-2 border border-white/10 bg-white/5 rounded-[16px] p-3 px-4 flex flex-col gap-1.5 w-full">
                    <span className="text-[12px] text-dark-gray font-normal not-italic uppercase tracking-wider">Description</span>
                    <span className="text-[13px] text-whitetext/90 leading-relaxed font-normal">
                        {video?.description || video?.synopsis || "-"}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default VideoDetailContent
