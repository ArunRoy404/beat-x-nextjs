import React from "react"
import CommonCard from "@/components/shared/CommonCard/CommonCard"
import TopTrackRow from "./TopTrackRow"

const TopTracksList = ({ data = [], viewAllHref = "/artist/dashboard/music" }) => {
    return (
        <CommonCard
            title="Top Tracks"
            subtitle="Ranked by total plays"
            link={{ text: "View All", href: viewAllHref }}
            className="flex flex-col gap-1 h-[380px] w-full"
        >
            <div className="flex-1 flex flex-col z-10 relative overflow-y-auto pr-1 custom-scrollbar">
                {data.map((track, index) => (
                    <TopTrackRow key={track.id} track={track} rank={index + 1} />
                ))}
            </div>
        </CommonCard>
    )
}

export default TopTracksList
