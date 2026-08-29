"use client"

import { TrendingDown, TrendingUp } from "lucide-react"
import { useUserTrendingStore } from "@/zustandStore/user/userStore/userTrendingStore"

const RecentSearchesPanel = () => {
    const recentSearches = useUserTrendingStore((state) => state.recentSearches)

    return (
        <div className="relative flex w-full flex-1 flex-col gap-4 overflow-hidden rounded-[16px] border border-(--glass-panel-border) bg-(--glass-panel-bg) p-4.25 backdrop-blur-[12px] lg:max-w-95">
            <div aria-hidden className="pointer-events-none absolute -top-px -right-px size-32 rounded-full bg-primary/20 blur-[30px]" />
            <div aria-hidden className="pointer-events-none absolute -bottom-px -left-px size-32 rounded-full bg-secondary/20 blur-[30px]" />

            <div className="relative flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-whitetext">Recent Searches</h2>
                <button type="button" className="cursor-pointer text-base text-secondary">
                    CLEAR
                </button>
            </div>

            <div className="relative flex flex-col gap-4">
                {recentSearches.map((entry) => (
                    <div key={entry.id} className="flex w-full items-center gap-2 rounded-[16px] bg-dark-accent px-4 py-3">
                        <span className="w-8 shrink-0 text-2xl font-black text-dark-gray">{entry.rank}</span>
                        {entry.thumbnail ? (
                            <img alt={entry.title} src={entry.thumbnail} className="size-12 shrink-0 rounded-[8px] object-cover" />
                        ) : (
                            <div aria-hidden className="size-12 shrink-0 rounded-[8px] bg-(--date-badge-bg)" />
                        )}
                        <div className="flex min-w-0 flex-1 flex-col gap-2">
                            <span className="truncate text-lg font-semibold text-whitetext">{entry.title}</span>
                            <span className="truncate text-sm text-dark-gray">{entry.subtitle}</span>
                        </div>
                        {entry.trend === "up" ? (
                            <TrendingUp className="size-5 shrink-0 text-trending-badge-bg" />
                        ) : (
                            <TrendingDown className="size-5 shrink-0 text-red-error" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RecentSearchesPanel
