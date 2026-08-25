import CommonPill from "@/components/shared/CommonPill"

const VideoPlayerHero = ({ video }) => {
    return (
        <div className="flex w-full flex-col gap-4">
            <div className="h-64 w-full overflow-hidden rounded-[16px] sm:h-96 lg:h-[499px]">
                <img alt={video.title} src={video.heroImage ?? video.thumbnail} className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col gap-2">
                <h1 className="truncate text-2xl font-semibold text-whitetext sm:text-[40px]">
                    {video.titleBn ?? video.title}
                </h1>
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-base text-light-gray sm:text-lg">
                        {video.views} • {video.premieredAgo ?? video.postedAgo}
                    </span>
                    {video.trending && (
                        <CommonPill className="bg-trending-badge-bg/20 px-3 py-1 text-trending-badge-bg">
                            #TRENDING
                        </CommonPill>
                    )}
                </div>
            </div>
        </div>
    )
}

export default VideoPlayerHero
