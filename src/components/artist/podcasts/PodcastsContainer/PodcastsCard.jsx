import React from "react"
import CommonSongCell from "@/components/shared/CommonTable/CommonSongCell"
import CommonTableStat from "@/components/shared/CommonTable/CommonTableStat"
import CommonTableStatus from "@/components/shared/CommonTable/CommonTableStatus"
import PodcastsTableActions from "@/components/artist/podcasts/PodcastsContainer/PodcastsTableActions"

const PodcastsCard = ({ podcast }) => {
    if (!podcast) return null
    return (
        <div className="flex flex-col gap-4 p-4 rounded-[16px] border border-whitetext/5 bg-whitetext/[0.02] backdrop-blur-md">
            <div className="flex items-start justify-between gap-3">
                <CommonSongCell title={podcast?.title} duration={podcast?.duration} cover={podcast?.cover} />
                <CommonTableStatus status={podcast?.status} className="shrink-0" />
            </div>
            <div className="grid grid-cols-2 gap-y-3 gap-x-4 border-t border-b border-whitetext/5 py-3 text-sm">
                <div className="flex flex-col gap-1">
                    <span className="text-light-whitetext text-[12px] font-normal uppercase tracking-wider">Series</span>
                    <span className="text-whitetext font-medium truncate">{podcast?.series || "-"}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-light-whitetext text-[12px] font-normal uppercase tracking-wider">Season</span>
                    <span className="text-whitetext font-medium truncate">S{podcast?.season || "-"}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-light-whitetext text-[12px] font-normal uppercase tracking-wider">Ep #</span>
                    <span className="text-whitetext font-medium truncate">EP {podcast?.episode || "-"}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-light-whitetext text-[12px] font-normal uppercase tracking-wider">Listeners</span>
                    <CommonTableStat value={podcast?.listeners} />
                </div>
            </div>
            <div className="flex items-center justify-end">
                <PodcastsTableActions status={podcast?.status} podcast={podcast} className="w-full justify-between pr-0" />
            </div>
        </div>
    )
}

export default PodcastsCard
