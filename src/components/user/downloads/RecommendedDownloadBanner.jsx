const RecommendedDownloadBanner = ({ recommendedDownload }) => {
    const { badge, title, subtitle, meta } = recommendedDownload

    return (
        <div className="flex w-full flex-col gap-2 rounded-[16px] border border-slate-700/50 bg-slate-800/40 p-4.25 backdrop-blur-[10px]">
            <span className="flex w-fit items-center rounded-full border border-secondary/30 bg-secondary/20 px-3.25 py-1.25 text-xs text-secondary">
                {badge}
            </span>
            <h3 className="truncate text-2xl font-semibold text-whitetext sm:text-[32px]">{title}</h3>
            <p className="truncate text-base font-semibold">
                <span className="text-secondary">{subtitle}</span> <span className="text-light-gray">• {meta}</span>
            </p>
        </div>
    )
}

export default RecommendedDownloadBanner
