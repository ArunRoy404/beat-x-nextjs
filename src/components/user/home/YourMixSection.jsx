"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useUserHomeStore } from "@/zustandStore/user/userStore/userHomeStore"
import { Carousel, CarouselContent, CarouselItem, useCarousel } from "@/components/ui/carousel"
import MixCard from "./MixCard"

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

const MixCarouselNav = () => {
    const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel()

    return (
        <>
            <NavButton direction="left" onClick={scrollPrev} disabled={!canScrollPrev} />
            <NavButton direction="right" onClick={scrollNext} disabled={!canScrollNext} />
        </>
    )
}

const YourMixSection = () => {
    const mixes = useUserHomeStore((state) => state.mixes)

    return (
        <section className="flex w-full flex-col gap-4">
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl text-whitetext sm:text-[32px]">Your Mix</h2>
                    <button type="button" className="shrink-0 cursor-pointer text-sm text-secondary sm:text-base">
                        View All
                    </button>
                </div>
                <p className="text-sm text-light-gray sm:text-base">Personalized rhythms for your unique flow.</p>
            </div>

            <Carousel
                opts={{ align: "start", dragFree: true, containScroll: "trimSnaps" }}
                className="group w-full min-w-0"
            >
                <MixCarouselNav />
                <CarouselContent className="-ml-4 sm:-ml-6">
                    {mixes.map((mix) => (
                        <CarouselItem key={mix.id} className="basis-40 pl-4 sm:basis-56 sm:pl-6 md:basis-64">
                            <MixCard mix={mix} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </section>
    )
}

export default YourMixSection
