"use client"

import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { useBrowseSongs } from "@/hooks/api/user/songs/useBrowseSongs"
import { usePlaySong } from "@/hooks/api/user/songs/usePlaySong"
import { Carousel, CarouselContent, CarouselItem, useCarousel } from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import RankedChartCard from "./RankedChartCard"

const NavButton = ({ direction, onClick, disabled }) => (
    <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={cn(
            "flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-dark-gray text-whitetext transition-colors hover:border-secondary hover:text-secondary disabled:pointer-events-none disabled:opacity-30"
        )}
        aria-label={direction === "left" ? "Previous" : "Next"}
    >
        {direction === "left" ? <ChevronLeft className="size-4" /> : <ChevronRight className="size-4" />}
    </button>
)

const GlobalTop50Nav = () => {
    const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel()

    return (
        <div className="flex items-center gap-4">
            <NavButton direction="left" onClick={scrollPrev} disabled={!canScrollPrev} />
            <NavButton direction="right" onClick={scrollNext} disabled={!canScrollNext} />
        </div>
    )
}

const GlobalTop50Section = () => {
    const { data: songsData } = useBrowseSongs({ page: 1, limit: 50 })
    const { playSong, currentSongId, isPlaying } = usePlaySong()

    const liveSongs =
        songsData?.songs ??
        songsData?.data ??
        (Array.isArray(songsData) ? songsData : [])

    const chart = Array.isArray(liveSongs)
        ? liveSongs.map((song, index) => ({
            id: song?._id || song?.id || index,
            rank: `#${index + 1}`,
            title: song?.title || "Song",
            subtitle: song?.artist || "",
            art: song?.coverUrl || "/watch/images/hero-deadline-studio.jpg",
            song,
        }))
        : []

    const topSong = liveSongs?.[0]
    const playlistOfTheWeek = topSong
        ? {
            title: "Playlist of the Week",
            subtitle: topSong?.title ? `${topSong.title} • By ${topSong.artist || "Beat-X"}` : "Global Viral Hits",
            cta: "Stream Global",
            background: topSong?.coverUrl || "/watch/images/hero-deadline-studio.jpg",
            song: topSong,
        }
        : null

    const isTopPlaying = currentSongId === (playlistOfTheWeek?.song?._id || playlistOfTheWeek?.song?.id) && isPlaying

    return (
        <Carousel opts={{ align: "start" }} className="w-full min-w-0">
            <div className="flex items-center justify-between gap-3">
                <h2 className="text-2xl text-whitetext sm:text-[32px]">Global Top 50</h2>
                {liveSongs.length > 0 && <GlobalTop50Nav />}
            </div>

            {liveSongs.length > 0 ? (
                <div className="mt-4 flex w-full flex-col items-start gap-6 sm:gap-8 lg:flex-row">
                    {playlistOfTheWeek && (
                        <div
                            className="flex h-56 w-full shrink-0 flex-col items-start justify-end gap-3 rounded-[16px] px-5 py-4 sm:h-72 sm:gap-4 sm:px-6 lg:h-88.5 lg:w-88"
                            style={{ backgroundImage: `url(${playlistOfTheWeek?.background})`, backgroundSize: "cover", backgroundPosition: "center" }}
                        >
                            <div className="flex flex-col gap-2">
                                <span className="text-xl font-semibold text-bright-cyan sm:text-2xl">{playlistOfTheWeek?.title}</span>
                                <span className="text-sm text-whitetext sm:text-base">{playlistOfTheWeek?.subtitle}</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => playlistOfTheWeek?.song ? playSong(playlistOfTheWeek.song) : null}
                                className="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-whitetext px-5 py-2.5 text-sm font-semibold text-button-text transition-transform active:scale-95 sm:px-8 sm:py-4 sm:text-base"
                            >
                                {isTopPlaying ? (
                                    <Pause className="size-4 sm:size-5" fill="currentColor" />
                                ) : (
                                    <Play className="size-4 sm:size-5" fill="currentColor" />
                                )}
                                {isTopPlaying ? "Pause" : playlistOfTheWeek?.cta}
                            </button>
                        </div>
                    )}

                    <div className="min-w-0 w-full flex-1">
                        <CarouselContent className="-ml-3 sm:-ml-4">
                            {chart.map((item) => {
                                const isThisPlaying = currentSongId === (item?.song?._id || item?.song?.id) && isPlaying
                                return (
                                    <CarouselItem key={item.id} className="basis-1/2 pl-3 sm:pl-4">
                                        <RankedChartCard
                                            item={item}
                                            onPlay={(it) => it?.song ? playSong(it.song) : null}
                                            isPlaying={isThisPlaying}
                                        />
                                    </CarouselItem>
                                )
                            })}
                        </CarouselContent>
                    </div>
                </div>
            ) : (
                <div className="mt-4 flex w-full flex-col items-center justify-center rounded-[16px] border border-dashed border-white/10 py-12 text-center">
                    <p className="text-base text-light-gray">No top songs found</p>
                </div>
            )}
        </Carousel>
    )
}

export default GlobalTop50Section
