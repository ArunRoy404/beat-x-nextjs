const ActiveSeriesGrid = ({ section }) => {
    return (
        <div className="flex w-full flex-col gap-4">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-whitetext sm:text-2xl">{section.title}</h3>
                <span className="shrink-0 cursor-pointer text-sm text-secondary sm:text-base">{section.viewAllLabel}</span>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {section.items.map((series) => (
                    <div
                        key={series.id}
                        className="relative flex min-h-70 w-full flex-col items-start justify-end gap-2 overflow-hidden rounded-3xl p-4 sm:min-h-80 lg:h-87 lg:min-h-0"
                        style={{ backgroundImage: `url(${series.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
                    >
                        <div className="absolute inset-0 bg-black/40" />
                        {series.badge && (
                            <span className="relative rounded-full border border-secondary bg-secondary/10 px-3 py-2 text-sm font-semibold text-secondary backdrop-blur-md">
                                {series.badge}
                            </span>
                        )}
                        <span className="relative text-3xl font-medium text-whitetext/40 sm:text-4xl">{series.title}</span>
                        <span className="relative text-sm text-light-gray">{series.subtitle}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ActiveSeriesGrid
