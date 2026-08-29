"use client"

import { useEffect, useRef, useState } from "react"
import { Play, Plus, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { useUserTrendingStore } from "@/zustandStore/user/userStore/userTrendingStore"
import { Carousel, CarouselContent, CarouselItem, useCarousel } from "@/components/ui/carousel"

const AUTOPLAY_DELAY = 6000

const HeroSlide = ({ slide }) => (
    <div
        className="relative flex h-75 w-full flex-col justify-end overflow-hidden rounded-[16px] p-5 sm:h-90 sm:rounded-[24px] sm:p-8 lg:h-105 lg:p-12"
        style={{ backgroundImage: `url(${slide.background})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="relative flex flex-col items-start gap-3 sm:gap-4">
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                <span className="flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/20 px-3.25 py-1.25 text-xs text-secondary">
                    <TrendingUp className="size-4" />
                    TRENDING NOW
                </span>
                <span className="text-xs text-light-gray">{slide.rank}</span>
            </div>
            <h1 className="max-w-3xl text-2xl leading-tight font-semibold text-whitetext sm:text-[44px] lg:text-[56px] xl:text-[72px]">
                {slide.title}
            </h1>
            <p className="max-w-2xl text-sm text-light-gray sm:text-base lg:text-lg">{slide.description}</p>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <button
                    type="button"
                    className="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold text-button-text transition-transform active:scale-95 sm:px-8 sm:py-4 sm:text-base"
                >
                    <Play className="size-4 sm:size-5" fill="currentColor" />
                    Listen Now
                </button>
                <button
                    type="button"
                    className="flex cursor-pointer items-center justify-center gap-2 rounded-full border border-(--glass-panel-border) bg-(--glass-panel-bg) px-5 py-2.5 text-sm font-semibold text-whitetext backdrop-blur-[12px] sm:px-8.25 sm:py-4.25 sm:text-base"
                >
                    <Plus className="size-5 sm:size-6" />
                    View Artist
                </button>
            </div>
        </div>
    </div>
)

const HeroCarouselDots = ({ slideCount }) => {
    const { api } = useCarousel()
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
        <div className="absolute right-4 bottom-4 z-10 flex items-center gap-1.5 sm:right-8 sm:bottom-8 sm:gap-2">
            {Array.from({ length: slideCount }).map((_, index) => (
                <button
                    key={index}
                    type="button"
                    aria-label={`Go to slide ${index + 1}`}
                    onClick={() => api?.scrollTo(index)}
                    className={cn(
                        "h-1.5 cursor-pointer rounded-full transition-all",
                        index === selectedIndex ? "w-8 bg-secondary" : "w-4 bg-whitetext/30"
                    )}
                />
            ))}
        </div>
    )
}

const HeroCarouselAutoplay = () => {
    const { api } = useCarousel()
    const timerRef = useRef(null)

    useEffect(() => {
        if (!api) return
        const play = () => {
            timerRef.current = setInterval(() => {
                if (api.canScrollNext()) {
                    api.scrollNext()
                } else {
                    api.scrollTo(0)
                }
            }, AUTOPLAY_DELAY)
        }
        const stop = () => clearInterval(timerRef.current)

        play()
        const rootNode = api.rootNode()
        rootNode.addEventListener("mouseenter", stop)
        rootNode.addEventListener("mouseleave", play)

        return () => {
            stop()
            rootNode.removeEventListener("mouseenter", stop)
            rootNode.removeEventListener("mouseleave", play)
        }
    }, [api])

    return null
}

const TrendingHeroCarousel = () => {
    const slides = useUserTrendingStore((state) => state.trendingHeroSlides)

    return (
        <Carousel opts={{ align: "start", loop: true }} className="group w-full min-w-0">
            <HeroCarouselAutoplay />
            <CarouselContent className="-ml-0">
                {slides.map((slide) => (
                    <CarouselItem key={slide.id} className="pl-0">
                        <HeroSlide slide={slide} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <HeroCarouselDots slideCount={slides.length} />
        </Carousel>
    )
}

export default TrendingHeroCarousel
