"use client"

import { TrendingUp } from "lucide-react"
import { useUserLibraryStore } from "@/zustandStore/user/userStore/userLibraryStore"

const SonicReplayCard = () => {
    const sonicReplay = useUserLibraryStore((state) => state.sonicReplay)

    return (
        <div className="flex w-full flex-1 flex-col gap-4 rounded-[16px] bg-dark-accent p-4">
            <div className="flex items-start justify-between">
                <div className="flex size-12 items-center justify-center rounded-full bg-trending-badge-bg/10">
                    <TrendingUp className="size-5 text-trending-badge-bg" />
                </div>
                <span className="rounded-2xl bg-trending-badge-bg/5 px-2 py-1 text-xs text-trending-badge-bg">
                    {sonicReplay.badge}
                </span>
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-[32px] text-whitetext">{sonicReplay.title}</span>
                <span className="text-sm text-light-gray">{sonicReplay.subtitle}</span>
            </div>
        </div>
    )
}

export default SonicReplayCard
