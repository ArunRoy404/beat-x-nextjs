"use client"

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import CarouselNavButtons from "@/components/shared/CarouselNavButtons"
import RankedChartCard from "@/components/user/trending/RankedChartCard"

const RecentlyPlayedSection = ({ albums }) => {
    return (
        <Carousel opts={{ align: "start" }} className="w-full min-w-0">
            <div className="flex items-center justify-between gap-3">
                <h2 className="text-2xl text-whitetext sm:text-[32px]">Recently Played</h2>
                <CarouselNavButtons />
            </div>
            <CarouselContent className="mt-4 -ml-4">
                {albums.map((album) => (
                    <CarouselItem key={album.id} className="basis-[45%] pl-4 sm:basis-1/3 lg:basis-1/4">
                        <RankedChartCard item={album} showRank={false} showMeta />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}

export default RecentlyPlayedSection
