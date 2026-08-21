"use client"

import { TrendingDown, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import CommonGlassPanel from "@/components/shared/CommonGlassPanel"
import { useUserWatchStore } from "@/zustandStore/user/userStore/userWatchStore"

const tagClasses = {
    primary: "bg-primary/20 text-primary",
    secondary: "bg-secondary/20 text-secondary",
    lime: "bg-trending-badge-bg/20 text-trending-badge-bg",
}

const ctaClasses = {
    primary: "border border-primary text-primary",
    secondary: "border border-secondary text-secondary",
    solid: "bg-dark-accent text-whitetext",
}

const glowClasses = {
    primary: "bg-primary/10",
    secondary: "bg-secondary/10",
    lime: "bg-trending-badge-bg/10",
}

const ReminderCard = ({ reminder }) => {
    const content = (
        <>
            <div className="relative flex w-full items-center justify-between">
                <span className={cn("rounded-2xl px-2 py-1 text-xs", tagClasses[reminder.tagVariant])}>{reminder.tag}</span>
                <span className="text-xs text-light-gray">{reminder.time}</span>
            </div>
            <div className="relative flex w-full flex-col gap-2">
                <span className="text-lg font-semibold whitespace-pre-line text-whitetext">{reminder.title}</span>
                <span className="text-sm text-light-gray">{reminder.subtitle}</span>
            </div>
            <button
                type="button"
                className={cn(
                    "relative w-full cursor-pointer rounded-full py-2.5 text-sm font-semibold",
                    ctaClasses[reminder.ctaVariant]
                )}
            >
                {reminder.cta}
            </button>
            <div aria-hidden className={cn("pointer-events-none absolute -top-px -right-px size-32 rounded-full blur-3xl", glowClasses[reminder.tagVariant])} />
        </>
    )

    if (reminder.glow) {
        return (
            <div className="relative flex w-full flex-col gap-4 rounded-[16px] border border-white/10 bg-background p-6.25 backdrop-blur-md">
                {content}
            </div>
        )
    }

    return (
        <CommonGlassPanel className="relative flex w-full flex-col gap-4 overflow-hidden rounded-[32px] p-6.25">
            {content}
        </CommonGlassPanel>
    )
}

const WeeklyTopCharts = () => {
    const weeklyTopCharts = useUserWatchStore((state) => state.weeklyTopCharts)

    return (
        <div className="flex w-full flex-col gap-4">
            <div className="flex items-center justify-between">
                <span className="text-xl font-semibold text-light-gray">WEEKLY TOP CHARTS</span>
                <span className="text-sm text-secondary">View All</span>
            </div>
            {weeklyTopCharts.map((entry) => (
                <div key={entry.rank} className="flex items-center gap-2 rounded-[16px] bg-dark-accent px-4 py-3">
                    <span className="w-8 text-2xl font-black text-dark-gray">{entry.rank}</span>
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
    )
}

const WatchUpcomingColumn = () => {
    const upcomingReminders = useUserWatchStore((state) => state.upcomingReminders)

    return (
        <div className="flex w-full flex-col gap-6 lg:w-88 lg:shrink-0">
            <h2 className="text-2xl text-whitetext sm:text-[32px]">Upcoming</h2>
            {upcomingReminders.map((reminder) => (
                <ReminderCard key={reminder.id} reminder={reminder} />
            ))}
            <WeeklyTopCharts />
        </div>
    )
}

export default WatchUpcomingColumn
