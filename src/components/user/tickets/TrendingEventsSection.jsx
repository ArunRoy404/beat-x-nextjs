import { ShoppingCart } from "lucide-react"
import { cn } from "@/lib/utils"
import { useUserTicketsStore } from "@/zustandStore/user/userStore/userTicketsStore"

const TrendingEventsSection = () => {
    const trendingEvents = useUserTicketsStore((state) => state.trendingEvents)

    return (
        <section className="flex w-full flex-col gap-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl text-whitetext sm:text-[32px]">Trending Events</h2>
                <button type="button" className="shrink-0 cursor-pointer text-sm text-secondary sm:text-base">
                    View All Gallery
                </button>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {trendingEvents.map((event) => (
                    <div key={event.id} className="flex flex-col gap-4 rounded-[16px] border border-white/10 bg-dark-accent p-3">
                        <div className="relative aspect-square w-full overflow-hidden rounded-[16px]">
                            <img alt={event.title} src={event.art} className="h-full w-full object-cover" />
                            {event.badge && (
                                <span
                                    className={cn(
                                        "absolute top-4 left-4 rounded-2xl px-2 py-1 text-xs",
                                        event.badge === "SOLD OUT"
                                            ? "bg-primary text-button-text"
                                            : "bg-trending-badge-bg text-trending-badge-text"
                                    )}
                                >
                                    {event.badge}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="truncate text-2xl font-semibold text-whitetext">{event.title}</span>
                            <span className="truncate text-sm text-light-gray">{event.location}</span>
                            <div className="flex items-center justify-between">
                                <span className="text-lg font-black text-secondary">{event.price}</span>
                                <button
                                    type="button"
                                    aria-label={`Add ${event.title} to cart`}
                                    className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-dark-gray/40 text-whitetext"
                                >
                                    <ShoppingCart className="size-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default TrendingEventsSection
