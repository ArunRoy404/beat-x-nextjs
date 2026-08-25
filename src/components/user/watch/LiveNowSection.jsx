"use client"

import { Radio } from "lucide-react"
import { useUserWatchStore } from "@/zustandStore/user/userStore/userWatchStore"
import LiveStreamCard from "./LiveStreamCard"

const LiveNowSection = () => {
    const liveNow = useUserWatchStore((state) => state.liveNow)

    return (
        <section className="flex w-full flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                    <Radio className="size-5 shrink-0 text-live-badge-bg" />
                    <h2 className="text-2xl whitespace-nowrap text-whitetext sm:text-[32px]">Live Now</h2>
                    <span className="rounded-md bg-trending-badge-bg/10 px-2 py-0.5 text-xs whitespace-nowrap text-trending-badge-bg">
                        {liveNow.viewersLabel}
                    </span>
                </div>
                <button type="button" className="shrink-0 cursor-pointer text-sm text-secondary sm:text-base">
                    View all live streams
                </button>
            </div>
            <div className="flex flex-col items-start gap-4 sm:flex-row">
                {liveNow.streams.map((stream) => (
                    <LiveStreamCard key={stream.id} stream={stream} />
                ))}
            </div>
        </section>
    )
}

export default LiveNowSection
