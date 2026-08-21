"use client"

import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useUserHomeStore } from "@/zustandStore/user/userStore/userHomeStore"
import MixCard from "./MixCard"

const YourMixSection = () => {
    const mixes = useUserHomeStore((state) => state.mixes)
    const containerRef = useRef(null)
    const [showLeftArrow, setShowLeftArrow] = useState(false)
    const [showRightArrow, setShowRightArrow] = useState(true)

    const checkScroll = () => {
        if (containerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = containerRef.current
            setShowLeftArrow(scrollLeft > 10)
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
        }
    }

    useEffect(() => {
        const el = containerRef.current
        if (el) {
            el.addEventListener("scroll", checkScroll, { passive: true })
            checkScroll()
            window.addEventListener("resize", checkScroll)
        }
        return () => {
            if (el) el.removeEventListener("scroll", checkScroll)
            window.removeEventListener("resize", checkScroll)
        }
    }, [mixes])

    const scroll = (direction) => {
        if (containerRef.current) {
            const { clientWidth } = containerRef.current
            const scrollAmount = clientWidth * 0.75
            const newScrollLeft = direction === "left" 
                ? containerRef.current.scrollLeft - scrollAmount 
                : containerRef.current.scrollLeft + scrollAmount
            
            containerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: "smooth"
            })
        }
    }

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
            
            <div className="group relative w-full">
                {/* Left navigation arrow */}
                {showLeftArrow && (
                    <button
                        type="button"
                        onClick={() => scroll("left")}
                        className="absolute -left-3 top-1/2 z-10 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black/60 text-whitetext opacity-0 transition-opacity duration-300 backdrop-blur-md hover:bg-white/20 hover:text-secondary group-hover:opacity-100 active:scale-90"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft className="size-5" />
                    </button>
                )}

                {/* Right navigation arrow */}
                {showRightArrow && (
                    <button
                        type="button"
                        onClick={() => scroll("right")}
                        className="absolute -right-3 top-1/2 z-10 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black/60 text-whitetext opacity-0 transition-opacity duration-300 backdrop-blur-md hover:bg-white/20 hover:text-secondary group-hover:opacity-100 active:scale-90"
                        aria-label="Scroll right"
                    >
                        <ChevronRight className="size-5" />
                    </button>
                )}

                {/* Horizontal scroll container */}
                <div
                    ref={containerRef}
                    className="flex w-full overflow-x-auto scroll-smooth gap-4 sm:gap-6 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                    {mixes.map((mix) => (
                        <div key={mix.id} className="w-40 sm:w-56 md:w-64 shrink-0 flex">
                            <MixCard mix={mix} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default YourMixSection
