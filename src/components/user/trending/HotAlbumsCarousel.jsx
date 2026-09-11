"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Carousel, CarouselContent, CarouselItem, useCarousel } from "@/components/ui/carousel"
import RankedChartCard from "./RankedChartCard"

import { useFeaturedAlbums } from "@/hooks/api/user/albums/useFeaturedAlbums"

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
        {direction === "left" ? <ChevronLeft className="size-5" /> : <ChevronRight className="size-5" />}
    </button>
)

const HotAlbumsCarouselNav = () => {
    const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel()

    return (
        <div className="flex items-center gap-4">
            <NavButton direction="left" onClick={scrollPrev} disabled={!canScrollPrev} />
            <NavButton direction="right" onClick={scrollNext} disabled={!canScrollNext} />
        </div>
    )
}

const HotAlbumsCarousel = () => {
    const { data: albumsData } = useFeaturedAlbums()

    const liveAlbums =
        albumsData?.albums ??
        albumsData?.data ??
        (Array.isArray(albumsData) ? albumsData : [])

    const albums = Array.isArray(liveAlbums)
        ? liveAlbums.map((album, index) => ({
            id: album?._id || album?.id || index,
            rank: `#${index + 1}`,
            title: album?.title || "Album",
            subtitle: album?.artist?.name || album?.artist || (album?.year ? `${album.year}` : ""),
            art: album?.coverUrl || album?.art,
            album,
        }))
        : []

    return (
        <Carousel opts={{ align: "start" }} className="w-full min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3">
                <h2 className="text-2xl text-whitetext sm:text-[32px]">Hot Albums</h2>
                <div className="flex items-center gap-3 sm:gap-6">
                    <span className="hidden cursor-pointer text-sm text-secondary sm:block sm:text-base">View all live streams</span>
                    {albums.length > 0 && <HotAlbumsCarouselNav />}
                </div>
            </div>
            {albums.length > 0 ? (
                <CarouselContent className="mt-4 -ml-3 sm:-ml-4">
                    {albums.map((album) => (
                        <CarouselItem key={album.id} className="basis-[70%] pl-3 sm:basis-1/3 sm:pl-4">
                            <RankedChartCard item={album} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            ) : (
                <div className="mt-4 flex w-full flex-col items-center justify-center rounded-[16px] border border-dashed border-white/10 py-8 text-center">
                    <p className="text-sm text-light-gray">No hot albums found</p>
                </div>
            )}
        </Carousel>
    )
}

export default HotAlbumsCarousel

