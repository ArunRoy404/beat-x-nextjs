import React from "react"
import Image from "next/image"
import { ArrowUp, ArrowDown } from "lucide-react"
import { cn } from "@/lib/utils"

const TopTrackRow = ({ track, rank }) => {
    if (!track) return null

    return (
        <div className="flex items-center gap-3 py-3 first:pt-0 last:pb-0 border-b border-white/[0.05] last:border-0">
            <span className="text-dark-gray text-[13px] font-medium w-5 shrink-0">
                {String(rank).padStart(2, "0")}
            </span>

            <div className="relative w-10 h-10 rounded-[8px] overflow-hidden shrink-0 border border-white/10">
                <Image src={track.cover} alt={track.title} fill sizes="40px" className="object-cover" />
            </div>

            <div className="flex flex-col min-w-0 flex-1">
                <span className="text-whitetext text-[14px] font-medium truncate">{track.title}</span>
                <span className="text-dark-gray text-[12px] truncate">{track.plays}</span>
            </div>

            <div className="flex flex-col items-end gap-0.5 shrink-0">
                <span
                    className={cn(
                        "flex items-center gap-0.5 text-[12px] font-semibold",
                        track.isPositive ? "text-green-success" : "text-red-error"
                    )}
                >
                    {track.isPositive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                    {track.changePercent}%
                </span>
                <span className="text-dark-gray text-[12px]">{track.duration}</span>
            </div>
        </div>
    )
}

export default TopTrackRow
