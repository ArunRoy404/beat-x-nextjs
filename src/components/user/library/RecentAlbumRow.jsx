const RecentAlbumRow = ({ album }) => {
    return (
        <div className="flex w-full items-center gap-4">
            <div className="flex min-w-0 flex-1 items-center gap-3.5">
                <div className="size-12 shrink-0 overflow-hidden rounded-[12px]">
                    <img alt={album.title} src={album.art} className="h-full w-full object-cover" />
                </div>
                <div className="flex min-w-0 flex-col gap-1">
                    <span className="truncate text-lg text-whitetext">{album.title}</span>
                    <span className="truncate text-xs text-light-gray">{album.artist}</span>
                </div>
            </div>
            <span className="flex-1 text-center text-xs text-light-gray">{album.released}</span>
            <span className="flex-1 text-center text-xs text-light-gray">{album.tracks}</span>
        </div>
    )
}

export default RecentAlbumRow
