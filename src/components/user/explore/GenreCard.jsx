const defaultGenreImages = [
    "/user-explore/images/genre-synthwave.png",
    "/user-explore/images/genre-cyber-pop.png",
    "/user-explore/images/genre-dark-techno.png",
    "/user-explore/images/genre-lo-fi-future.png",
    "/user-explore/images/genre-glitch-hop.jpg",
    "/user-explore/images/genre-ambient-void.png",
]

const GenreCard = ({ genre, index = 0 }) => {
    const title = genre?.name || genre?.title || "-"
    const artSrc = genre?.art || genre?.coverUrl || genre?.imageUrl || defaultGenreImages[index % defaultGenreImages.length]
    const subtitle = genre?.subtitle || (genre?.songCount ? `${genre.songCount} Tracks` : null)

    return (
        <div className="relative flex min-h-45 flex-1 items-end overflow-hidden rounded-[16px] px-3.5 py-3 sm:min-h-52 lg:h-60 lg:min-h-0">
            {artSrc && (
                <img alt={title} src={artSrc} className="absolute inset-0 h-full w-full object-cover" />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-transparent" />
            <div className="relative flex flex-col gap-1">
                <span className="text-2xl font-semibold text-whitetext wrap-break-word">{title}</span>
                {subtitle && <span className="text-xs text-light-gray">{subtitle}</span>}
            </div>
        </div>
    )
}

export default GenreCard

