import { BadgeCheck, MoreHorizontal, Play } from "lucide-react"

const ArtistHeroBanner = ({ artist }) => {
    return (
        <div
            className="relative flex min-h-100 w-full flex-col justify-end overflow-hidden rounded-[16px] p-4 sm:min-h-105 sm:p-6 lg:h-114.25 lg:min-h-0 lg:p-6"
            style={{ backgroundImage: `url(${artist.heroImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
        >
            <div className="absolute inset-0 bg-(image:--explore-hero-overlay-gradient)" />

            <div className="relative flex flex-col items-start gap-3 sm:gap-4">
                <span className="flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/20 px-3.25 py-1.25">
                    <BadgeCheck className="size-4 text-secondary" />
                    <span className="text-xs text-secondary">VERIFIED ARTIST</span>
                </span>

                <h1 className="text-4xl leading-none font-semibold text-whitetext sm:text-5xl lg:text-[72px]">
                    {artist.name}
                </h1>

                <p className="max-w-2xl text-sm text-light-gray sm:text-base lg:text-lg">
                    {artist.description}
                </p>

                <div className="flex w-full flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        {artist.stats.map((stat, index) => (
                            <div key={stat.id} className="flex items-center gap-4">
                                {index > 0 && <span className="h-10 w-px bg-dark-gray" />}
                                <div className="flex flex-col gap-2 whitespace-nowrap">
                                    <span className="text-xl font-semibold text-whitetext sm:text-2xl">{stat.value}</span>
                                    <span className="text-xs text-light-gray">{stat.label}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                        <button
                            type="button"
                            className="flex items-center gap-2 rounded-[32px] bg-secondary px-4 py-2.5 text-sm font-semibold text-button-text sm:px-8 sm:py-4 sm:text-base"
                        >
                            <Play className="size-5" fill="currentColor" />
                            Listen Now
                        </button>
                        <button
                            type="button"
                            className="rounded-[32px] border border-secondary bg-whitetext/20 px-4 py-2.5 text-sm font-semibold text-whitetext sm:px-8 sm:py-4 sm:text-base"
                        >
                            Follow
                        </button>
                        <button
                            type="button"
                            className="flex size-10 shrink-0 items-center justify-center rounded-[32px] border border-secondary bg-whitetext/20 sm:size-13"
                        >
                            <MoreHorizontal className="size-5 text-whitetext" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArtistHeroBanner
