"use client"

import React from "react"
import { useArtistFollowersStore } from "@/zustandStore/artist/artistStore/artistFollowersStore"
import CommonCard from "@/components/shared/CommonCard/CommonCard"

const StreamsPerTrack = () => {
    const streams = useArtistFollowersStore((state) => state.streamsPerTrack)
    const maxValue = Math.max(...streams.map((s) => s.raw), 1)

    return (
        <CommonCard className="flex flex-col gap-4 h-[380px] w-full">
            <h3 className="text-whitetext text-[16px] font-semibold z-10 relative">
                Streams per Track
            </h3>

            <div className="flex flex-col gap-4 z-10 relative flex-1 justify-center">
                {streams.map((track) => (
                    <div key={track.name} className="flex flex-col gap-1.5 w-full">
                        <div className="flex items-center justify-between text-[13px] font-medium">
                            <span className="flex items-center gap-2 text-light-gray">
                                <span className="text-[15px] leading-none shrink-0 select-none">{track.flag}</span>
                                {track.name}
                            </span>
                            <span className="text-whitetext font-semibold">{track.value}</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                            <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{
                                    width: `${(track.raw / maxValue) * 100}%`,
                                    backgroundColor: track.color,
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </CommonCard>
    )
}

export default StreamsPerTrack
