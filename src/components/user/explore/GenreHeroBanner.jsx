"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Play, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useUserExploreStore } from "@/zustandStore/user/userStore/userExploreStore"

const GenreHeroBanner = () => {
    const exploreHero = useUserExploreStore((state) => state.exploreHero)
    const [currentIndex, setCurrentIndex] = useState(0)
    const isHovered = useRef(false)

    const slides = Array.isArray(exploreHero) ? exploreHero : (exploreHero ? [exploreHero] : [])
    const currentSlide = slides[currentIndex] || {}

    const handleNext = useCallback(() => {
        if (slides.length <= 1) return
        setCurrentIndex((prev) => (prev + 1) % slides.length)
    }, [slides.length])

    const handlePrev = useCallback(() => {
        if (slides.length <= 1) return
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
    }, [slides.length])

    useEffect(() => {
        if (slides.length <= 1) return

        const timer = setInterval(() => {
            if (!isHovered.current) {
                handleNext()
            }
        }, 5000)

        return () => clearInterval(timer)
    }, [slides.length, handleNext])

    if (slides.length === 0) return null

    return (
        <div
            className="group relative min-h-90 w-full shrink-0 overflow-hidden rounded-[16px] sm:min-h-96 lg:h-112.5 lg:min-h-0"
            onMouseEnter={() => {
                isHovered.current = true
            }}
            onMouseLeave={() => {
                isHovered.current = false
            }}
        >
            {/* Background Image Carousel with smooth crossfade */}
            <AnimatePresence initial={false}>
                <motion.img
                    key={currentIndex}
                    alt=""
                    src={currentSlide.artwork}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0 h-full w-full object-cover"
                />
            </AnimatePresence>

            {/* Overlay Gradient (stays constant on top) */}
            <div className="absolute inset-0 bg-(image:--explore-hero-overlay-gradient)" />

            {/* Content (Badge, Titles, Description) animated on transition */}
            <div className="absolute inset-y-0 left-0 z-10 flex max-w-lg flex-col justify-center gap-4 px-6 sm:px-12">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                        className="flex flex-col gap-4"
                    >
                        <span className="w-fit rounded-full bg-trending-badge-bg/10 px-3 py-1 text-xs text-trending-badge-bg">
                            {currentSlide.badge}
                        </span>
                        <h1 className="text-5xl leading-none font-semibold text-whitetext sm:text-6xl lg:text-[72px]">
                            <span className="block">{currentSlide.titleLine1}</span>
                            <span className="block text-primary">{currentSlide.titleLine2}</span>
                        </h1>
                        <p className="text-lg text-light-gray leading-relaxed">
                            {currentSlide.description}
                        </p>
                    </motion.div>
                </AnimatePresence>

                {/* Constant Action Button (remains static for seamless clicks) */}
                <button
                    type="button"
                    className="flex w-fit cursor-pointer items-center gap-2 rounded-[32px] bg-secondary px-8 py-4 text-base font-semibold text-button-text transition-transform active:scale-95 shadow-md"
                >
                    <Play className="size-5" fill="currentColor" />
                    LISTEN NOW
                </button>
            </div>

            {/* Manual Navigation Controls (Fade in on hover) */}
            {slides.length > 1 && (
                <>
                    <button
                        type="button"
                        onClick={handlePrev}
                        className="absolute left-4 top-1/2 z-20 flex size-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black/40 text-whitetext opacity-0 transition-all duration-300 backdrop-blur-md hover:bg-white/20 hover:text-secondary active:scale-90 group-hover:opacity-100"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="size-6" />
                    </button>
                    <button
                        type="button"
                        onClick={handleNext}
                        className="absolute right-4 top-1/2 z-20 flex size-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black/40 text-whitetext opacity-0 transition-all duration-300 backdrop-blur-md hover:bg-white/20 hover:text-secondary active:scale-90 group-hover:opacity-100"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="size-6" />
                    </button>

                    {/* Bottom-right slide indicators */}
                    <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2 sm:bottom-9 sm:right-9">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => setCurrentIndex(index)}
                                className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
                                    currentIndex === index ? "w-6 bg-secondary" : "w-2 bg-white/30 hover:bg-white/50"
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default GenreHeroBanner
