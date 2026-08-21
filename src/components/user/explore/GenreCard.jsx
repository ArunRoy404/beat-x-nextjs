const GenreCard = ({ genre }) => {
    return (
        <div className="relative flex h-60 flex-1 items-end overflow-hidden rounded-[16px] px-3.5 py-3">
            <img alt="" src={genre.art} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-transparent" />
            <div className="relative flex flex-col gap-1">
                <span className="text-2xl font-semibold text-whitetext">{genre.title}</span>
                <span className="text-xs text-light-gray">{genre.subtitle}</span>
            </div>
        </div>
    )
}

export default GenreCard
