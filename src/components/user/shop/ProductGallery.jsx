"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Carousel, CarouselContent, CarouselItem, useCarousel } from "@/components/ui/carousel"
import ProductImagePlaceholder from "./ProductImagePlaceholder"

const ThumbNavButton = ({ direction, onClick, disabled }) => (
    <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={cn(
            "absolute top-1/2 z-10 flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-(--glass-panel-border) bg-black/60 text-whitetext opacity-0 transition-opacity duration-300 backdrop-blur-md hover:bg-white/20 hover:text-secondary group-hover:opacity-100 active:scale-90 disabled:pointer-events-none disabled:opacity-0",
            direction === "left" ? "-left-2" : "-right-2"
        )}
        aria-label={direction === "left" ? "Previous images" : "Next images"}
    >
        {direction === "left" ? <ChevronLeft className="size-4" /> : <ChevronRight className="size-4" />}
    </button>
)

const ThumbnailNav = () => {
    const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel()

    return (
        <>
            <ThumbNavButton direction="left" onClick={scrollPrev} disabled={!canScrollPrev} />
            <ThumbNavButton direction="right" onClick={scrollNext} disabled={!canScrollNext} />
        </>
    )
}

const ProductGallery = ({ images, name, placeholderIcon }) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const visibleCount = Math.min(images.length, 4)

    return (
        <div className="flex w-full flex-1 flex-col gap-4">
            <div className="relative h-72 w-full overflow-hidden rounded-[16px] sm:h-96 lg:h-[499px]">
                {images[activeIndex] ? (
                    <img alt={name} src={images[activeIndex]} className="h-full w-full object-cover" />
                ) : (
                    <ProductImagePlaceholder icon={placeholderIcon} className="h-full w-full" iconClassName="size-24" />
                )}
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2">
                    {images.map((_, index) => (
                        <span
                            key={index}
                            className={cn(
                                "h-1 rounded-full transition-all",
                                index === activeIndex ? "w-8 bg-secondary" : "w-2 bg-light-gray"
                            )}
                        />
                    ))}
                </div>
            </div>
            {images.length > 1 && (
                <Carousel opts={{ align: "start", containScroll: "trimSnaps" }} className="group w-full min-w-0">
                    <ThumbnailNav />
                    <CarouselContent className="-ml-2.5">
                        {images.map((image, index) => (
                            <CarouselItem key={image + index} className="pl-2.5" style={{ flexBasis: `${100 / visibleCount}%` }}>
                                <button
                                    type="button"
                                    onClick={() => setActiveIndex(index)}
                                    aria-label={`View image ${index + 1}`}
                                    className={cn(
                                        "aspect-square w-full cursor-pointer overflow-hidden rounded-[16px] border",
                                        index === activeIndex ? "border-secondary" : "border-(--glass-panel-border)"
                                    )}
                                >
                                    {image ? (
                                        <img alt="" src={image} className="h-full w-full object-cover" />
                                    ) : (
                                        <ProductImagePlaceholder icon={placeholderIcon} className="h-full w-full" iconClassName="size-6" />
                                    )}
                                </button>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            )}
        </div>
    )
}

export default ProductGallery
