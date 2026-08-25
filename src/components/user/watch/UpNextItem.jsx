import Link from "next/link"

const UpNextItem = ({ video }) => {
    return (
        <Link href={`/watch/${video.id}`} className="flex w-full items-center gap-2">
            <div className="relative h-[80px] w-[120px] shrink-0 overflow-hidden rounded-[16px]">
                <img alt={video.title} src={video.thumbnail} className="h-full w-full object-cover" />
                <span className="absolute right-2 bottom-2 rounded-2xl bg-(--media-duration-badge-bg) px-1 py-0.5 text-xs text-whitetext backdrop-blur-[4px]">
                    {video.duration}
                </span>
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-2">
                <span className="line-clamp-2 text-base font-semibold whitespace-pre-line text-whitetext">{video.title}</span>
                <span className="truncate text-[10px] text-secondary">{video.channel}</span>
                <span className="truncate text-xs text-light-gray">
                    {video.views} • {video.postedAgo}
                </span>
            </div>
        </Link>
    )
}

export default UpNextItem
