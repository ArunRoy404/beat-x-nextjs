const StorageUsageCard = ({ storageUsage }) => {
    const { usedGB, totalGB, usedPercent, breakdown } = storageUsage

    return (
        <div className="flex w-full flex-col gap-2 rounded-[12px] border border-light-gray bg-dark-accent p-4.25 backdrop-blur-[10px] lg:w-90 lg:shrink-0">
            <div className="flex items-center justify-between font-semibold text-whitetext">
                <span className="text-base">Storage Used</span>
                <span className="text-xs">{usedGB} GB / {totalGB} GB</span>
            </div>

            <div className="h-1.5 w-full overflow-hidden rounded-full bg-dark-gray">
                <div className="h-full rounded-full bg-secondary shadow-[0px_0px_12px_0px_rgba(0,220,229,0.5)]" style={{ width: `${usedPercent}%` }} />
            </div>

            <div className="flex items-center justify-between">
                {breakdown.map((item) => (
                    <span key={item.id} className="flex items-center gap-1 text-xs text-light-gray">
                        <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
                        {item.label}
                    </span>
                ))}
            </div>
        </div>
    )
}

export default StorageUsageCard
