"use client"

import React from "react"
import { format } from "date-fns"
import InfoBox from "./InfoBox"
import { formatDurationMs } from "@/lib/format/formatDuration"
import { VIDEO_STATUS_LABELS, normalizeVideoStatus } from "@/lib/constants/videoStatus"

/**
 * `ownerId` and `reviewedBy` are Mongo refs: sometimes populated objects,
 * sometimes bare ObjectIds. Either way they must be reduced to a string —
 * rendering the object itself throws "Objects are not valid as a React child".
 */
const refToText = (ref, ...fields) => {
    if (!ref) return ""
    if (typeof ref === "string") return ref
    if (typeof ref === "object") {
        for (const field of fields) {
            if (ref?.[field]) return ref[field]
        }
        return ref?._id || ""
    }
    return ""
}

const formatDate = (value) => {
    if (!value) return ""
    const date = new Date(value)
    return isNaN(date.getTime()) ? "" : format(date, "MMM d, yyyy")
}

const VideoDetailContent = ({ video }) => {
    const ownerName = video?.ownerId?.name || video?.artist || refToText(video?.ownerId, "name", "email") || "Admin"
    const genreName = video?.genre?.name || (typeof video?.genre === "string" ? video.genre : "-")
    const formattedDate = formatDate(video?.publishedAt)

    return (
        /* Scrollable Body Content */
        <div className="p-4 flex flex-col gap-5 overflow-y-auto flex-1 min-h-0 scrollbar-thin">
            <div className="grid grid-cols-2 gap-4">

                {/* Info Boxes */}
                <InfoBox label="Uploader / Artist" value={ownerName} />
                <InfoBox label="Genre" value={genreName} />
                <InfoBox label="Published Date" value={formattedDate} />
                <InfoBox label="Scheduled For" value={formatDate(video?.scheduledAt)} />
                <InfoBox label="Transcode Status" value={video?.transcodeStatus} />
                <InfoBox label="Total Duration" value={formatDurationMs(video?.durationMs)} />
                <InfoBox label="Featured" value={video?.isFeatured ? "Yes" : "No"} />
                <InfoBox
                    label="Trending"
                    value={video?.isTrending ? (video?.trendDirection ? `Yes (${video.trendDirection})` : "Yes") : "No"}
                />

                {/* Description / Synopsis (Full Width) */}
                <div className="col-span-2 border border-white/10 bg-white/5 rounded-[16px] p-3 px-4 flex flex-col gap-1.5 w-full">
                    <span className="text-[12px] text-dark-gray font-normal not-italic uppercase tracking-wider">Description</span>
                    <span className="text-[13px] text-whitetext/90 leading-relaxed font-normal">
                        {video?.description || video?.synopsis || "-"}
                    </span>
                </div>
            </div>

            {/* Moderation / review trail — populated once a video goes through
                the artist submission queue (approve/reject). */}
            <div className="grid grid-cols-2 gap-4">
                <InfoBox
                    label="Submitted Status"
                    value={VIDEO_STATUS_LABELS[normalizeVideoStatus(video?.submittedStatus)] || ""}
                />
                <InfoBox label="Submitted At" value={formatDate(video?.submittedAt)} />
                <InfoBox label="Reviewed By" value={refToText(video?.reviewedBy, "name", "email")} />
                <InfoBox label="Reviewed At" value={formatDate(video?.reviewedAt)} />
                <InfoBox label="Rejection Reason" value={video?.rejectionReason} />
            </div>
        </div>
    )
}

export default VideoDetailContent
