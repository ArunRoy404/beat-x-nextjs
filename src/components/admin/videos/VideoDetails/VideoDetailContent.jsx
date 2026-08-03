"use client"

import React from "react"
import InfoBox from "./InfoBox"

const VideoDetailContent = ({ video }) => {
    return (
        /* Scrollable Body Content */
        <div className="p-4 flex flex-col gap-5 overflow-y-auto flex-1 min-h-0 scrollbar-thin">
            <div className="grid grid-cols-2 gap-4">
                
                {/* Info Boxes */}
                <InfoBox label="Author" value={video?.artist || "Unknown Artist"} />
                <InfoBox label="Genre" value={video?.genre || "Pop"} />
                <InfoBox label="Release Date" value={video?.released || "-"} />
                <InfoBox label="Resolution" value={video?.resolution || "1080p"} />
                <InfoBox label="Total Duration" value={video?.duration || "-"} />
                <InfoBox label="Featured" value={video?.isPremium ? "Yes" : "No"} />

                {/* Synopsis (Full Width) */}
                <div className="col-span-2 border border-white/10 bg-white/5 rounded-[16px] p-3 px-4 flex flex-col gap-1.5 w-full">
                    <span className="text-[12px] text-dark-gray font-normal not-italic uppercase tracking-wider">Synopsis</span>
                    <span className="text-[13px] text-whitetext/90 leading-relaxed font-normal">
                        {video?.synopsis || `No description provided for "${video?.title}". This video is created by ${video?.artist}.`}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default VideoDetailContent
