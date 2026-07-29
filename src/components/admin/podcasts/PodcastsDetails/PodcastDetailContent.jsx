"use client"

import React from "react"
import { Mic } from "lucide-react"
import Image from "next/image"
import InfoBox from "./InfoBox"

const PodcastDetailContent = ({ podcast }) => {
    return (
        /* Scrollable Body Content */
        <div className="p-4 flex flex-col gap-5 overflow-y-auto flex-1 min-h-0 scrollbar-thin">
            <div className="grid grid-cols-2 gap-4">
                {/* Episode Box */}
                <div className="border border-white/10 bg-white/5 rounded-[16px] p-4 flex flex-col justify-between">
                    <span className="text-[12px] text-dark-gray font-normal mb-2 uppercase tracking-wider">Episode</span>
                    <div className="group flex flex-col items-center justify-center p-6 h-32 rounded-[16px] border border-dashed border-secondary/15 bg-secondary/15 gap-2 w-full">
                        <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                            <Mic className="w-5 h-5" />
                        </div>
                        <div className="text-center min-w-0 w-full px-4 flex flex-col items-center gap-1">
                            <p className="text-whitetext text-sm font-medium truncate">
                                {podcast?.audioFile?.name || "Audio file Seasonal"}
                            </p>
                            <p className="text-light-whitetext text-[11px]">
                                {podcast?.audioFile?.format || "MP3"}, {podcast?.audioFile?.size || "230MB"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Thumbnail Box */}
                <div className="border border-white/10 bg-white/5 rounded-[16px] p-4 flex flex-col justify-between">
                    <span className="text-[12px] text-dark-gray font-normal mb-2 uppercase tracking-wider">Thumbnail</span>
                    <div className="relative w-full h-32 rounded-[16px] overflow-hidden border border-white/10">
                        <Image
                            src={podcast?.cover || "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=150"}
                            alt="Thumbnail"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover rounded-[16px]"
                        />
                    </div>
                </div>

                {/* Info rows */}
                <InfoBox label="Host" value={podcast?.artist || "Unknown Host"} />
                <InfoBox label="Series" value={podcast?.series || "Single"} />
                <InfoBox label="Season" value={podcast?.season || "1"} />
                <InfoBox label="Episode" value={podcast?.episode || "1"} />
                <InfoBox label="Category" value={podcast?.genre || "-"} />
                <InfoBox label="Listeners" value={podcast?.listeners || "0"} />

                {/* Description Box (Full Width) */}
                <div className="col-span-2 border border-white/10 bg-white/5 rounded-[16px] p-3 px-4 flex flex-col gap-1.5 w-full">
                    <span className="text-[12px] text-dark-gray font-normal not-italic uppercase tracking-wider">About this Episode</span>
                    <span className="text-[13px] text-whitetext/90 leading-relaxed font-normal">
                        {podcast?.description || `${podcast?.title} — episode ${podcast?.episode || "1"} of ${podcast?.series || "Tech BD"}, season ${podcast?.season || "1"}, hosted by ${podcast?.artist || "Arif Hossain"}. Category: ${podcast?.genre || "Technology"}.`}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default PodcastDetailContent
