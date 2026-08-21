import { Play } from "lucide-react"
import { useUserPodcastsStore } from "@/zustandStore/user/userStore/userPodcastsStore"

const TrendingRefractionsSection = () => {
    const trendingRefractions = useUserPodcastsStore((state) => state.trendingRefractions)

    return (
        <section className="flex w-full flex-col gap-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl text-whitetext sm:text-[32px]">Trending Refractions</h2>
                <div className="flex items-center gap-2">
                    <span className="h-1 w-16 rounded-full bg-secondary" />
                    <span className="h-1 w-8 rounded-full bg-light-gray" />
                    <span className="h-1 w-8 rounded-full bg-light-gray" />
                </div>
            </div>
            <div className="flex flex-col gap-4">
                {trendingRefractions.map((episode) => (
                    <div key={episode.id} className="flex items-center gap-4 rounded-[16px] bg-dark-accent px-4 py-3">
                        <span className="w-8 shrink-0 text-2xl font-black text-dark-gray">{episode.rank}</span>
                        <img alt={episode.title} src={episode.art} className="size-16 shrink-0 rounded-[8px] object-cover" />
                        <div className="flex min-w-0 flex-1 flex-col gap-2">
                            <span className="truncate text-lg font-semibold text-whitetext">{episode.title}</span>
                            <span className="truncate text-sm text-dark-gray">
                                {episode.channel} • {episode.duration}
                            </span>
                        </div>
                        <button
                            type="button"
                            aria-label={`Play ${episode.title}`}
                            className="flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-full bg-(image:--button-bg) text-button-text"
                        >
                            <Play className="size-5" fill="currentColor" />
                        </button>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default TrendingRefractionsSection
