"use client"

import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import { useUserTrendingStore } from "@/zustandStore/user/userStore/userTrendingStore"
import { Carousel, CarouselContent, CarouselItem, useCarousel } from "@/components/ui/carousel"
import RankedChartCard from "./RankedChartCard"

const NavButton = ({ direction, onClick, disabled }) => (
    <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-dark-gray text-whitetext transition-colors hover:border-secondary hover:text-secondary disabled:pointer-events-none disabled:opacity-30"
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
    const globalTop50 = useUserTrendingStore((state) => state.globalTop50)
    const { playlistOfTheWeek, chart } = globalTop50

    return (
        <Carousel opts={{ align: "start" }} className="w-full min-w-0">
            <div className="flex items-center justify-between gap-3">
                <h2 className="text-2xl text-whitetext sm:text-[32px]">Global Top 50</h2>
                <GlobalTop50Nav />
            </div>

            <div className="mt-4 flex w-full flex-col items-start gap-6 sm:gap-8 lg:flex-row">
                <div
                    className="flex h-56 w-full shrink-0 flex-col items-start justify-end gap-3 rounded-[16px] px-5 py-4 sm:h-72 sm:gap-4 sm:px-6 lg:h-88.5 lg:w-88"
                    style={{ backgroundImage: `url(${playlistOfTheWeek.background})`, backgroundSize: "cover", backgroundPosition: "center" }}
                >
                    <div className="flex flex-col gap-2">
                        <span className="text-xl font-semibold text-bright-cyan sm:text-2xl">{playlistOfTheWeek.title}</span>
                        <span className="text-sm text-whitetext sm:text-base">{playlistOfTheWeek.subtitle}</span>
                    </div>
                    <button
                        type="button"
                        className="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-whitetext px-5 py-2.5 text-sm font-semibold text-button-text transition-transform active:scale-95 sm:px-8 sm:py-4 sm:text-base"
                    >
                        <Play className="size-4 sm:size-5" fill="currentColor" />
                        {playlistOfTheWeek.cta}
                    </button>
                </div>

                <div className="min-w-0 w-full flex-1">
                    <CarouselContent className="-ml-3 sm:-ml-4">
                        {chart.map((item) => (
                            <CarouselItem key={item.id} className="basis-1/2 pl-3 sm:pl-4">
                                <RankedChartCard item={item} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </div>
            </div>
        </Carousel>
    )
}

export default GlobalTop50Section
