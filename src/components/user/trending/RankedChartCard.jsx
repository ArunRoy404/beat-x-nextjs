import { Play } from "lucide-react"

const RankedChartCard = ({ item, showRank = true, showMeta = false }) => {
    return (
        <div className="flex min-w-0 flex-1 flex-col gap-4">
            <div
                className="relative flex h-40 w-full flex-col justify-between overflow-hidden rounded-[16px] p-3 shadow-[0px_0px_10px_0px_rgba(204,151,255,0.2)] sm:h-50 sm:p-4"
                style={{ backgroundImage: `url(${item.art})`, backgroundSize: "cover", backgroundPosition: "center" }}
            >
                <div className="absolute inset-0 bg-black/30" />
                {showRank && (
                    <>
                        <span className="relative text-xl font-black text-secondary sm:text-2xl">{item.rank}</span>
                        <div className="relative flex items-end justify-end">
                            <span className="flex size-8 items-center justify-center rounded-full bg-(--glass-panel-bg) backdrop-blur-md sm:size-10">
                                <Play className="size-3.5 text-whitetext sm:size-4" fill="currentColor" />
                            </span>
                        </div>
                    </>
                )}
            </div>
            <div className="flex min-w-0 flex-col gap-1">
                <span className="truncate text-base font-semibold text-whitetext">{item.title}</span>
                <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm text-light-gray">{item.subtitle}</span>
                    {showMeta && item.meta && (
                        <span className="shrink-0 text-xs font-semibold text-light-gray">{item.meta}</span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default RankedChartCard
