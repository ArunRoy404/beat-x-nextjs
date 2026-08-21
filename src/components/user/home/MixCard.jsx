const MixCard = ({ mix }) => {
    return (
        <div className="flex min-w-0 flex-1 basis-40 flex-col gap-2">
            <div className="h-40 w-full overflow-hidden rounded-[16px] sm:h-56 md:h-64">
                <img alt={mix.title} src={mix.art} className="h-full w-full object-cover" />
            </div>
            <span className="truncate text-lg font-semibold text-whitetext">{mix.title}</span>
            <span className="truncate text-sm text-light-gray">{mix.subtitle}</span>
        </div>
    )
}

export default MixCard
