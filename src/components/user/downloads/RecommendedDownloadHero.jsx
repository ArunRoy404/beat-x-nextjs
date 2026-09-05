import { Download } from "lucide-react"

const RecommendedDownloadHero = ({ recommendedDownload }) => {
    const { badge, title, subtitle, meta } = recommendedDownload

    return (
        <div
            className="flex min-h-50 w-full flex-1 items-end justify-between gap-4 rounded-[16px] border border-slate-700/50 p-6 backdrop-blur-[10px]"
            style={{ background: "linear-gradient(to bottom, rgba(30,41,59,0.4), rgba(82,112,161,0.4))" }}
        >
            <div className="flex min-w-0 flex-col gap-2">
                <span className="flex w-fit items-center rounded-full border border-secondary/30 bg-secondary/20 px-3.25 py-1.25 text-xs text-secondary">
                    {badge}
                </span>
                <h3 className="truncate text-2xl font-semibold text-whitetext sm:text-[32px]">{title}</h3>
                <p className="truncate text-base font-semibold">
                    <span className="text-secondary">{subtitle}</span> <span className="text-light-gray">• {meta}</span>
                </p>
            </div>

            <button
                type="button"
                aria-label="Download"
                className="flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-full bg-whitetext text-background transition-opacity hover:opacity-90"
            >
                <Download className="size-6" />
            </button>
        </div>
    )
}

export default RecommendedDownloadHero
