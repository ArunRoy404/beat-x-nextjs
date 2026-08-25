"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import { cn } from "@/lib/utils"
import { useUserPodcastsStore } from "@/zustandStore/user/userStore/userPodcastsStore"
import { Carousel, CarouselContent, CarouselItem, useCarousel } from "@/components/ui/carousel"

const PAGE_SIZE = 3

const chunk = (items, size) => {
    const pages = []
    for (let i = 0; i < items.length; i += size) pages.push(items.slice(i, i + size))
    return pages
}

const RefractionRow = ({ episode }) => (
    <div className="flex items-center gap-4 rounded-[16px] bg-dark-accent px-4 py-3">
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
)

const NavButton = ({ direction, onClick, disabled }) => (
    <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={cn(
            "absolute top-1/2 z-10 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black/60 text-whitetext opacity-0 transition-opacity duration-300 backdrop-blur-md hover:bg-white/20 hover:text-secondary group-hover:opacity-100 active:scale-90 disabled:pointer-events-none disabled:opacity-0",
            direction === "left" ? "-left-3" : "-right-3"
        )}
        aria-label={direction === "left" ? "Previous" : "Next"}
    >
        {direction === "left" ? <ChevronLeft className="size-5" /> : <ChevronRight className="size-5" />}
    </button>
)

const RefractionsCarouselControls = ({ pageCount }) => {
    const { api, scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel()
    const [selectedIndex, setSelectedIndex] = useState(0)

    useEffect(() => {
        if (!api) return
        const onSelect = () => setSelectedIndex(api.selectedScrollSnap())
        onSelect()
        api.on("select", onSelect)
        api.on("reInit", onSelect)
        return () => api.off("select", onSelect)
    }, [api])

    return (
        <>
            <NavButton direction="left" onClick={scrollPrev} disabled={!canScrollPrev} />
            <NavButton direction="right" onClick={scrollNext} disabled={!canScrollNext} />
            <div className="flex items-center gap-2">
                {Array.from({ length: pageCount }).map((_, index) => (
                    <span
                        key={index}
                        className={cn(
                            "h-1 rounded-full transition-all",
                            index === selectedIndex ? "w-16 bg-secondary" : "w-8 bg-light-gray"
                        )}
                    />
                ))}
            </div>
        </>
    )
}

const TrendingRefractionsSection = () => {
    const trendingRefractions = useUserPodcastsStore((state) => state.trendingRefractions)
    const pages = chunk(trendingRefractions, PAGE_SIZE)

    return (
        <section className="flex w-full flex-col gap-4">
            <Carousel opts={{ align: "start" }} className="group w-full min-w-0">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl text-whitetext sm:text-[32px]">Trending Refractions</h2>
                    <RefractionsCarouselControls pageCount={pages.length} />
                </div>
                <CarouselContent className="mt-4">
                    {pages.map((page, index) => (
                        <CarouselItem key={index} className="flex flex-col gap-4 pl-0">
                            {page.map((episode) => (
                                <RefractionRow key={episode.id} episode={episode} />
                            ))}
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </section>
    )
}

export default TrendingRefractionsSection
