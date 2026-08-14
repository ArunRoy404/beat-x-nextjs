"use client"

import React from "react"
import Image from "next/image"
import { ImagePlus, SquarePen } from "lucide-react"
import { Button } from "@/components/ui/button"

const ArtistProfileHero = ({ profile }) => {
    return (
        <div className="relative w-full h-[340px] sm:h-[300px] rounded-[16px] overflow-hidden">
            {/* Cover Photo */}
            <Image
                src={profile?.coverImage}
                alt={profile?.name || "Artist Cover"}
                fill
                sizes="100vw"
                className="object-cover"
                priority
            />

            {/* Fade overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

            {/* Change Image trigger */}
            <Button
                notImplemented
                variant="outline"
                className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm border border-white/15 text-white text-[13px] font-medium rounded-full px-4 py-2 flex items-center gap-1.5 hover:bg-black/60"
            >
                <ImagePlus className="w-4 h-4" />
                Change Image
            </Button>

            {/* Bottom content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div className="flex flex-col gap-2 min-w-0">
                    <h1 className="text-whitetext text-[32px] sm:text-[40px] font-bold not-italic leading-none truncate">
                        {profile?.name}
                    </h1>
                    <p className="text-white/70 text-[14px] font-normal max-w-2xl">
                        {profile?.tagline}
                    </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full border border-secondary/20 bg-secondary/15 text-secondary text-[12px] font-semibold select-none">
                        {profile?.followers} FOLLOWERS
                    </span>
                    <Button
                        notImplemented
                        variant="outline"
                        className="bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[13px] font-medium rounded-full px-4 py-2 flex items-center gap-1.5 hover:bg-white/15"
                    >
                        <SquarePen className="w-3.5 h-3.5" />
                        Edit
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ArtistProfileHero
