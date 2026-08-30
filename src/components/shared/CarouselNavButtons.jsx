"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCarousel } from "@/components/ui/carousel"

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

const CarouselNavButtons = () => {
    const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel()

    return (
        <div className="flex items-center gap-4">
            <NavButton direction="left" onClick={scrollPrev} disabled={!canScrollPrev} />
            <NavButton direction="right" onClick={scrollNext} disabled={!canScrollNext} />
        </div>
    )
}

export default CarouselNavButtons
