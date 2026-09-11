"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Carousel, CarouselContent, CarouselItem, useCarousel } from "@/components/ui/carousel"
import TrendingVideoCard from "@/components/user/watch/TrendingVideoCard"
import { useTrendingVideos } from "@/hooks/api/user/videos/useTrendingVideos"

const NavButton = ({ direction, onClick, disabled }) => (
    <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={cn(
            "flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-dark-gray text-whitetext transition-colors hover:border-secondary hover:text-secondary disabled:pointer-events-none disabled:opacity-30"
        )}
        aria-label={direction === "left" ? "Previous" : "Next"}
    >
        {direction === "left" ? <ChevronLeft className="size-4" /> : <ChevronRight className="size-4" />}
    </button>
)

const TrendingVideosCarouselNav = () => {
    const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel()

    return (
        <div className="flex items-center gap-2">
            <NavButton direction="left" onClick={scrollPrev} disabled={!canScrollPrev} />
            <NavButton direction="right" onClick={scrollNext} disabled={!canScrollNext} />
        </div>
    )
}

const TrendingVideosCarousel = () => {
    const { data: videosData } = useTrendingVideos()

    const liveVideos =
        videosData?.videos ??
        videosData?.data ??
        (Array.isArray(videosData) ? videosData : [])

    const videos = Array.isArray(liveVideos) ? liveVideos : []

    return (
        <Carousel opts={{ align: "start" }} className="w-full min-w-0">
            <div className="flex items-center justify-between gap-3">
                <h2 className="text-2xl text-whitetext sm:text-[32px]">Trending Videos</h2>
                <span className="cursor-pointer text-sm text-secondary sm:text-base">Explore All</span>
            </div>
            {videos.length > 0 ? (
                <>
                    <CarouselContent className="mt-4 -ml-3 sm:-ml-4">
                        {videos.map((video, idx) => (
                            <CarouselItem key={video?._id || video?.id || idx} className={cn("basis-[80%] pl-3 sm:basis-1/3 sm:pl-4 lg:basis-1/4")}>
                                <TrendingVideoCard video={video} showPlayButton />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="flex w-full justify-end pt-4">
                        <TrendingVideosCarouselNav />
                    </div>
                </>
            ) : (
                <div className="mt-4 flex w-full flex-col items-center justify-center rounded-[16px] border border-dashed border-white/10 py-8 text-center">
                    <p className="text-sm text-light-gray">No trending videos found</p>
                </div>
            )}
        </Carousel>
    )
}

export default TrendingVideosCarousel
