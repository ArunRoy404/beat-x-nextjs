"use client"

import React from "react"
import { format } from "date-fns"
import CommonInfoBox from "@/components/shared/CommonInfoBox/CommonInfoBox"

const PodcastDetailContent = ({ podcast }) => {
    return (
        /* Scrollable Body Content */
        <div className="p-4 flex flex-col gap-5 overflow-y-auto flex-1 min-h-0 scrollbar-thin">
            <div className="grid grid-cols-2 gap-4">
                <CommonInfoBox label="Owner" value={podcast?.ownerId?.name} />
                <CommonInfoBox label="Language" value={podcast?.language} />
                <CommonInfoBox label="Episodes" value={podcast?.totalEpisodes ?? 0} />
                <CommonInfoBox label="Rating" value={podcast?.ratingCount ? `${podcast.ratingAverage} (${podcast.ratingCount})` : "-"} />
                <CommonInfoBox label="Weekly Plays" value={podcast?.playCountWeek ?? 0} />
                <CommonInfoBox label="Published" value={podcast?.publishedAt ? format(new Date(podcast.publishedAt), "MMM d, yyyy") : "-"} />

                {/* Description Box (Full Width) */}
                <div className="col-span-2 border border-white/10 bg-white/5 rounded-[16px] p-3 px-4 flex flex-col gap-1.5 w-full">
                    <span className="text-[12px] text-dark-gray font-normal not-italic uppercase tracking-wider">Description</span>
                    <span className="text-[13px] text-whitetext/90 leading-relaxed font-normal">
                        {podcast?.description || "-"}
                    </span>
                </div>

                {/* Episodes list (Full Width) */}
                {podcast?.episodes?.length > 0 && (
                    <div className="col-span-2 border border-white/10 bg-white/5 rounded-[16px] p-3 px-4 flex flex-col gap-2 w-full">
                        <span className="text-[12px] text-dark-gray font-normal not-italic uppercase tracking-wider">Episodes</span>
                        <div className="flex flex-col gap-2">
                            {podcast.episodes.map((episode) => (
                                <div key={episode._id} className="flex items-center justify-between gap-2 text-[13px]">
                                    <span className="text-whitetext/90 truncate">{episode.title}</span>
                                    <span className="text-dark-gray shrink-0 capitalize">{episode.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PodcastDetailContent
