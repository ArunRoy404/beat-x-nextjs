import Link from "next/link"

const TrendingVideoCard = ({ video }) => {
    return (
        <Link href={`/watch/${video.id}`} className="flex min-w-0 flex-1 flex-col gap-2">
            <div
                className="relative flex h-56 w-full items-end justify-end overflow-hidden rounded-[16px] p-4 sm:h-64 lg:h-[280px]"
                style={{ backgroundImage: `url(${video.thumbnail})`, backgroundSize: "cover", backgroundPosition: "center" }}
            >
                <span className="relative rounded-2xl bg-(--release-item-bg) px-2 py-1 text-xs font-bold text-whitetext backdrop-blur-[4px]">
                    {video.duration}
                </span>
            </div>
            <span className="truncate text-lg font-semibold text-whitetext">{video.title}</span>
            <span className="truncate text-sm text-light-gray">
                {video.channel} • {video.views} • {video.postedAgo}
            </span>
        </Link>
    )
}

export default TrendingVideoCard
