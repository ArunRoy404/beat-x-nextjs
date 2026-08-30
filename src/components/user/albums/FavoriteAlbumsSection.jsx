import Image from "next/image"
import { Play, Heart, TrendingUp } from "lucide-react"
import RankedChartCard from "@/components/user/trending/RankedChartCard"

const FavoriteAlbumsSection = ({ featured, albums }) => {
    return (
        <section className="flex w-full flex-col gap-4">
            <h2 className="text-2xl text-whitetext sm:text-[32px]">Your Favorite Albums</h2>

            <div className="flex w-full flex-col gap-6 lg:flex-row">
                <div className="relative flex min-h-100 w-full flex-col justify-end gap-4 overflow-hidden rounded-[16px] border border-light-gray p-6 lg:min-h-0 lg:flex-[1_0_0]">
                    <Image
                        src={featured.art}
                        alt={featured.title}
                        fill
                        sizes="(min-width: 1024px) 40vw, 100vw"
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />

                    <div className="relative flex flex-col gap-2">
                        <span className="flex w-fit items-center gap-2 rounded-full border border-secondary/30 bg-secondary/20 px-3.25 py-1.25 text-xs text-secondary">
                            <TrendingUp className="size-4" />
                            {featured.badge}
                        </span>
                        <h3 className="truncate text-2xl font-semibold text-whitetext sm:text-[32px]">{featured.title}</h3>
                        <p className="truncate text-base font-semibold">
                            <span className="text-secondary">{featured.subtitle}</span>{" "}
                            <span className="text-light-gray">• {featured.meta}</span>
                        </p>
                    </div>

                    <div className="relative flex items-center gap-4">
                        <button
                            type="button"
                            className="flex cursor-pointer items-center gap-2 rounded-full bg-secondary px-8 py-4 text-base font-semibold text-button-text"
                        >
                            <Play className="size-5" fill="currentColor" />
                            Play All
                        </button>
                        <button
                            type="button"
                            aria-label="Like album"
                            className="flex size-13 shrink-0 cursor-pointer items-center justify-center rounded-full border border-dark-gray text-whitetext transition-colors hover:border-secondary hover:text-secondary"
                        >
                            <Heart className="size-6" />
                        </button>
                    </div>
                </div>

                <div className="grid w-full grid-cols-2 gap-4 lg:w-135 lg:shrink-0">
                    {albums.map((album) => (
                        <RankedChartCard key={album.id} item={album} showRank={false} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FavoriteAlbumsSection
