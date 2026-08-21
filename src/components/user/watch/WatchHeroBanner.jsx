"use client"

import { Play, Plus } from "lucide-react"
import { useUserWatchStore } from "@/zustandStore/user/userStore/userWatchStore"

const WatchHeroBanner = () => {
    const watchHero = useUserWatchStore((state) => state.watchHero)

    return (
        <div className="relative h-[480px] w-full shrink-0 overflow-hidden rounded-[16px] sm:h-[460px] lg:h-[622px]">
            <img alt="" className="absolute inset-0 h-full w-full object-cover" src={watchHero.artwork} />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/50 to-transparent" />

            <div className="absolute inset-y-0 left-0 z-10 flex max-w-2xl flex-col justify-center gap-3 px-6 py-8 sm:gap-4 sm:px-12">
                <span className="flex w-fit items-center gap-2 rounded-full border border-secondary/30 bg-secondary/20 px-3.25 py-1.25 text-[10px] font-bold tracking-wide text-secondary uppercase">
                    <span className="size-2 rounded-full bg-secondary" />
                    {watchHero.badge}
                </span>
                <h1 className="text-2xl leading-tight font-semibold text-whitetext sm:text-6xl lg:text-[72px]">
                    {watchHero.title}
                </h1>
                <p className="max-w-xl text-sm text-light-gray sm:text-lg">{watchHero.description}</p>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                    <button
                        type="button"
                        className="flex cursor-pointer items-center gap-2 rounded-[32px] bg-secondary px-5 py-3 text-sm font-semibold text-button-text transition-transform active:scale-95 sm:px-8 sm:py-4 sm:text-base"
                    >
                        <Play className="size-5" fill="currentColor" />
                        Watch Premiere
                    </button>
                    <button
                        type="button"
                        className="flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-(--glass-panel-bg) px-5 py-3 text-sm font-semibold text-whitetext backdrop-blur-md transition-transform active:scale-95 sm:px-8 sm:py-4 sm:text-base"
                    >
                        <Plus className="size-6" />
                        Add to Library
                    </button>
                </div>
            </div>
        </div>
    )
}

export default WatchHeroBanner
