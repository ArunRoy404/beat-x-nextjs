import { cn } from "@/lib/utils"

const TourDatesList = ({ section }) => {
    return (
        <div className="flex w-full flex-col gap-4">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-whitetext sm:text-2xl">{section.title}</h3>
                <span className="shrink-0 cursor-pointer text-sm text-secondary sm:text-base">{section.viewAllLabel}</span>
            </div>
            <div className="flex flex-col gap-2">
                {section.items.map((tour) => (
                    <div
                        key={tour.id}
                        className="flex w-full flex-col items-stretch gap-3 rounded-[16px] border border-(--slate-card-border) bg-(--slate-card-bg) p-4.25 backdrop-blur-[10px] sm:flex-row sm:items-center sm:gap-2"
                    >
                        <div className="flex flex-1 items-center gap-2">
                            <div className="flex shrink-0 flex-col items-center justify-center gap-0 rounded-xl border border-(--date-badge-border) bg-(--date-badge-bg) px-4.25 py-2.25">
                                <span className="text-xs text-light-gray">{tour.month}</span>
                                <span className="text-xl text-whitetext">{tour.day}</span>
                            </div>
                            <div className="flex min-w-0 flex-1 flex-col gap-2">
                                <span className="truncate text-lg font-semibold text-whitetext sm:text-2xl">{tour.venue}</span>
                                <span className="truncate text-sm text-light-gray sm:text-base">{tour.location}</span>
                            </div>
                        </div>
                        <span
                            className={cn(
                                "shrink-0 rounded-full border px-4.25 py-2.25 text-center text-sm whitespace-nowrap",
                                tour.status === "sold-out"
                                    ? "border-light-gray text-light-gray"
                                    : "border-secondary text-secondary"
                            )}
                        >
                            {tour.status === "sold-out" ? "Sold Out" : "Get Tickets"}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TourDatesList
