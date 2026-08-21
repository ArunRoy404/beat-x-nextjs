"use client"

import { Info, Play } from "lucide-react"
import CommonPill from "@/components/shared/CommonPill"
import { useUserHomeStore } from "@/zustandStore/user/userStore/userHomeStore"

const HeroBanner = () => {
    const heroContent = useUserHomeStore((state) => state.heroContent)

    return (
        <div className="relative h-64 w-full shrink-0 overflow-hidden rounded-[16px] sm:h-80 lg:h-[460px]">
            <img alt="" src={heroContent.artwork} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-(image:--hero-overlay-gradient)" />
            <div className="absolute bottom-6 left-6 flex max-w-xs flex-col gap-4 sm:bottom-9 sm:left-9">
                <div className="flex items-center gap-2">
                    {heroContent.badges.map((badge, index) => (
                        <CommonPill key={badge} variant={index === 0 ? "filled" : "glass"} className="uppercase">
                            {badge}
                        </CommonPill>
                    ))}
                </div>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-secondary px-8 py-4 font-semibold text-button-text"
                    >
                        <Play className="size-5" fill="currentColor" />
                        Play Now
                    </button>
                    <button
                        type="button"
                        className="flex size-13 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-(--glass-panel-bg) backdrop-blur-md"
                    >
                        <Info className="size-4 text-whitetext" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HeroBanner
