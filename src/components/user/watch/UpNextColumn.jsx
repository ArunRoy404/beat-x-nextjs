"use client"

import { useState } from "react"
import { ArrowRight, Pause } from "lucide-react"
import { cn } from "@/lib/utils"
import { useUserWatchStore } from "@/zustandStore/user/userStore/userWatchStore"
import UpNextItem from "./UpNextItem"

const UpNextColumn = ({ currentVideoId }) => {
    const upNextVideos = useUserWatchStore((state) => state.upNextVideos)
    const proFeaturePromo = useUserWatchStore((state) => state.proFeaturePromo)
    const queueMiniItem = useUserWatchStore((state) => state.queueMiniItem)
    const [autoPlay, setAutoPlay] = useState(true)

    const queue = upNextVideos.filter((video) => video.id !== currentVideoId)

    return (
        <div className="flex w-full flex-col gap-6 lg:w-88 lg:shrink-0">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-whitetext">Up Next</h2>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-secondary">Auto-play</span>
                    <button
                        type="button"
                        onClick={() => setAutoPlay((prev) => !prev)}
                        aria-pressed={autoPlay}
                        aria-label="Toggle auto-play"
                        className={cn(
                            "flex h-6 w-12 shrink-0 cursor-pointer items-center rounded-full px-0.5 transition-colors",
                            autoPlay ? "justify-end bg-secondary" : "justify-start bg-dark-gray"
                        )}
                    >
                        <span className="size-5 rounded-full bg-white shadow-sm" />
                    </button>
                </div>
            </div>

            {queue.map((video) => (
                <UpNextItem key={video.id} video={video} />
            ))}

            <div className="relative flex w-full flex-col gap-4 overflow-hidden rounded-[32px] border border-white/10 bg-(--glass-panel-bg) p-6.25 backdrop-blur-md">
                <span className="relative w-fit rounded-2xl bg-secondary/20 px-2 py-1 text-xs text-secondary">
                    {proFeaturePromo.tag}
                </span>
                <div className="relative flex flex-col gap-2">
                    <span className="text-lg font-semibold text-whitetext">{proFeaturePromo.title}</span>
                    <span className="text-sm text-light-gray">{proFeaturePromo.description}</span>
                </div>
                <button type="button" className="relative flex w-fit cursor-pointer items-center gap-1 text-sm font-semibold text-secondary">
                    {proFeaturePromo.cta}
                    <ArrowRight className="size-5" />
                </button>
                <div aria-hidden className="pointer-events-none absolute -top-px -right-px size-32 rounded-full bg-secondary/10 blur-3xl" />
            </div>

            <div className="flex w-full items-center gap-2 rounded-[16px] bg-dark-accent px-4 py-3">
                <img alt={queueMiniItem.title} src={queueMiniItem.thumbnail} className="h-12 w-16 shrink-0 rounded object-cover" />
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <span className="truncate text-lg font-semibold text-whitetext">{queueMiniItem.title}</span>
                    <span className="truncate text-sm text-dark-gray">{queueMiniItem.subtitle}</span>
                </div>
                <Pause className="size-5 shrink-0 text-whitetext" fill="currentColor" />
            </div>
        </div>
    )
}

export default UpNextColumn
