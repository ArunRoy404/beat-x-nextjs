"use client"

import { cn } from "@/lib/utils"
import CommonGlassPanel from "@/components/shared/CommonGlassPanel"
import { useUserExploreStore } from "@/zustandStore/user/userStore/userExploreStore"

const LiveSessionsPanel = () => {
    const liveSessions = useUserExploreStore((state) => state.liveSessions)

    return (
        <CommonGlassPanel className="flex w-full flex-col gap-4 p-4">
            <h2 className="text-2xl font-semibold text-whitetext">Live Sessions</h2>
            <div className="flex flex-col gap-6">
                {liveSessions.map((session) => {
                    const isLive = session.status === "LIVE"
                    return (
                        <div
                            key={session.id}
                            className={cn("flex items-center gap-4", !isLive && "opacity-60")}
                        >
                            <div className="relative shrink-0">
                                <img
                                    alt={session.title}
                                    src={session.avatar}
                                    className={cn(
                                        "size-14 rounded-full border-2 object-cover",
                                        isLive ? "border-secondary" : "border-dark-gray"
                                    )}
                                />
                                <span
                                    className={cn(
                                        "absolute -right-3 -bottom-1 rounded-2xl px-1.5 py-0.5 text-xs text-whitetext",
                                        isLive ? "bg-(--live-badge-bg)" : "bg-dark-gray"
                                    )}
                                >
                                    {session.status}
                                </span>
                            </div>
                            <div className="flex min-w-0 flex-1 flex-col">
                                <span className="truncate text-base font-semibold text-whitetext">{session.title}</span>
                                <span className="truncate text-xs text-light-gray">{session.subtitle}</span>
                            </div>
                        </div>
                    )
                })}
                <button
                    type="button"
                    className="w-full cursor-pointer rounded-full border border-secondary/20 py-3.25 text-base text-secondary"
                >
                    Open Session Radar
                </button>
            </div>
        </CommonGlassPanel>
    )
}

export default LiveSessionsPanel
