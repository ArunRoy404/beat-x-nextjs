import React from "react"
import CommonSongCell from "@/components/shared/CommonTable/CommonSongCell"
import CommonTableTag from "@/components/shared/CommonTable/CommonTableTag"
import CommonTableStat from "@/components/shared/CommonTable/CommonTableStat"
import CommonTableStatus from "@/components/shared/CommonTable/CommonTableStatus"
import PodcastsTableActions from "./PodcastsTableActions"

const PodcastsCard = ({ podcast }) => {
    if (!podcast) return null

    return (
        <div className="flex flex-col gap-4 p-4 rounded-[16px] border border-whitetext/5 bg-whitetext/[0.02] backdrop-blur-md">
            {/* Top row: Podcast details + Status badge */}
            <div className="flex items-start justify-between gap-3">
                <CommonSongCell
                    title={podcast?.title}
                    duration={podcast?.duration}
                    cover={podcast?.cover}
                />
                <CommonTableStatus status={podcast?.status} className="shrink-0" />
            </div>

            {/* Metadata list */}
            <div className="grid grid-cols-2 gap-y-3 gap-x-4 border-t border-b border-whitetext/5 py-3 text-sm">
                <div className="flex flex-col gap-1">
                    <span className="text-light-whitetext text-[12px] font-normal uppercase tracking-wider">Artist/Host</span>
                    <span className="text-whitetext font-medium truncate">{podcast?.artist || "-"}</span>
                </div>

                <div className="flex flex-col gap-1">
                    <span className="text-light-whitetext text-[12px] font-normal uppercase tracking-wider">Series</span>
                    <span className="text-whitetext font-medium truncate">{podcast?.series || "-"}</span>
                </div>

                <div className="flex flex-col gap-1">
                    <span className="text-light-whitetext text-[12px] font-normal uppercase tracking-wider">Category</span>
                    <CommonTableTag>{podcast?.genre}</CommonTableTag>
                </div>

                <div className="flex flex-col gap-1">
                    <span className="text-light-whitetext text-[12px] font-normal uppercase tracking-wider">Streams</span>
                    <CommonTableStat value={podcast?.streams} />
                </div>

                <div className="flex flex-col gap-1">
                    <span className="text-light-whitetext text-[12px] font-normal uppercase tracking-wider">Released</span>
                    <span className="text-whitetext font-medium truncate">{podcast?.released || "-"}</span>
                </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-end">
                <PodcastsTableActions status={podcast?.status} podcast={podcast} className="w-full justify-between pr-0" />
            </div>
        </div>
    )
}

export default PodcastsCard
