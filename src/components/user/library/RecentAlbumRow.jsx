const RecentAlbumRow = ({ album }) => {
    const coverSrc = album?.coverUrl || album?.art || "/user-explore/images/genre-cyber-pop.png"
    const title = album?.title || "-"
    const artist = album?.artist?.name || album?.artist || "-"
    const released = album?.released || (album?.releaseDate ? new Date(album.releaseDate).getFullYear() : (album?.year || "-"))
    const tracks = album?.tracks || (album?.trackCount ? `${album.trackCount} Tracks` : "-")

    return (
        <div className="flex w-full items-center gap-4">
            <div className="flex min-w-0 flex-1 items-center gap-3.5">
                <div className="size-12 shrink-0 overflow-hidden rounded-[12px] bg-white/5">
                    <img alt={title} src={coverSrc} className="h-full w-full object-cover" />
                </div>
                <div className="flex min-w-0 flex-col gap-1">
                    <span className="truncate text-lg text-whitetext">{title}</span>
                    <span className="truncate text-xs text-light-gray">{artist}</span>
                </div>
            </div>
            <span className="flex-1 text-center text-xs text-light-gray">{released}</span>
            <span className="flex-1 text-center text-xs text-light-gray">{tracks}</span>
        </div>
    )
}

export default RecentAlbumRow

