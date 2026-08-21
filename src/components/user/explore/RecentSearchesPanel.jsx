"use client"

import { History, Search } from "lucide-react"
import CommonGlassPanel from "@/components/shared/CommonGlassPanel"
import { useUserExploreStore } from "@/zustandStore/user/userStore/userExploreStore"

const typeIcon = {
    cluster: History,
    playlist: Search,
}

const RecentSearchesPanel = () => {
    const recentSearches = useUserExploreStore((state) => state.recentSearches)

    return (
        <CommonGlassPanel className="flex w-full flex-col gap-4 p-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-whitetext">Recent Searches</h2>
                <button type="button" className="cursor-pointer text-base text-secondary">
                    CLEAR
                </button>
            </div>
            <div className="flex flex-col gap-4">
                {recentSearches.map((item) => {
                    const Icon = typeIcon[item.type]
                    return (
                        <div key={item.id} className="flex items-center gap-3.5">
                            {Icon ? (
                                <div className="flex size-12 shrink-0 items-center justify-center rounded-[12px] bg-dark-accent">
                                    <Icon className="size-5 text-primary" />
                                </div>
                            ) : (
                                <div className="size-12 shrink-0 overflow-hidden rounded-[12px]">
                                    <img alt={item.title} src={item.art} className="h-full w-full object-cover" />
                                </div>
                            )}
                            <div className="flex min-w-0 flex-1 flex-col gap-1">
                                <span className="truncate text-lg text-whitetext">{item.title}</span>
                                <span className="truncate text-xs text-light-gray">{item.subtitle}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </CommonGlassPanel>
    )
}

export default RecentSearchesPanel
