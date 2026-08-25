import { Play } from "lucide-react"
import { useUserPodcastsStore } from "@/zustandStore/user/userStore/userPodcastsStore"

const PodcastHeroBanner = () => {
    const podcastHero = useUserPodcastsStore((state) => state.podcastHero)

    return (
        <div className="relative h-[420px] w-full shrink-0 overflow-hidden rounded-[16px] sm:h-[420px] lg:h-[450px]">
            <img alt="" className="absolute inset-0 h-full w-full object-cover" src={podcastHero.artwork} />
            <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/55 to-transparent" />

            <div className="absolute inset-y-0 left-0 z-10 flex max-w-xl flex-col justify-center gap-3 px-6 py-8 sm:gap-4 sm:px-12">
                <div className="flex flex-wrap items-center gap-4">
                    <span className="w-fit rounded-full bg-trending-badge-bg/10 px-3 py-1 text-xs text-trending-badge-bg">
                        {podcastHero.badge}
                    </span>
                    <span className="text-sm text-secondary sm:text-lg">{podcastHero.meta}</span>
                </div>
                <h1 className="text-4xl leading-tight font-semibold text-whitetext sm:text-6xl lg:text-[72px]">
                    <span className="block">{podcastHero.titleLine1}</span>
                    <span className="block text-primary">{podcastHero.titleLine2}</span>
                </h1>
                <p className="max-w-md text-sm text-light-gray sm:text-lg">{podcastHero.description}</p>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                    <button
                        type="button"
                        className="flex cursor-pointer items-center gap-2 rounded-[32px] bg-secondary px-5 py-3 text-sm font-semibold text-button-text transition-transform active:scale-95 sm:px-8 sm:py-4 sm:text-base"
                    >
                        <Play className="size-5" fill="currentColor" />
                        LISTEN NOW
                    </button>
                    <button
                        type="button"
                        className="flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-(--glass-panel-bg) px-5 py-3 text-sm font-semibold text-whitetext backdrop-blur-md transition-transform active:scale-95 sm:px-8 sm:py-4 sm:text-base"
                    >
                        VIEW SERIES
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PodcastHeroBanner
