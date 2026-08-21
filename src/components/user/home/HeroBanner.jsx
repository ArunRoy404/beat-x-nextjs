"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Info, Play, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import CommonPill from "@/components/shared/CommonPill"
import { useUserHomeStore } from "@/zustandStore/user/userStore/userHomeStore"

const HeroBanner = () => {
    const heroContent = useUserHomeStore((state) => state.heroContent)
    const [currentIndex, setCurrentIndex] = useState(0)
    const isHovered = useRef(false)

    const slides = Array.isArray(heroContent) ? heroContent : (heroContent ? [heroContent] : [])
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
            className="group relative h-64 w-full shrink-0 overflow-hidden rounded-[16px] sm:h-80 lg:h-[460px]"
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
            <div className="absolute inset-0 bg-(image:--hero-overlay-gradient)" />

            {/* Content (Badges, Titles, Subtitles) animated on transition */}
            <div className="absolute bottom-6 left-6 z-10 flex max-w-xs flex-col gap-4 sm:bottom-9 sm:left-9">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="flex flex-col gap-2.5"
                    >
                        <div className="flex items-center gap-2">
                            {currentSlide.badges?.map((badge, index) => (
                                <CommonPill key={badge} variant={index === 0 ? "filled" : "glass"} className="uppercase">
                                    {badge}
                                </CommonPill>
                            ))}
                        </div>
                        {currentSlide.title && (
                            <div className="flex flex-col gap-0.5">
                                <h2 className="text-2xl font-bold text-whitetext sm:text-3xl lg:text-4xl tracking-tight leading-tight">
                                    {currentSlide.title}
                                </h2>
                                {currentSlide.subtitle && (
                                    <p className="text-xs font-semibold text-light-gray/80 sm:text-sm">
                                        {currentSlide.subtitle}
                                    </p>
                                )}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Constant Action Buttons (remain static for seamless clicks) */}
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-secondary px-8 py-4 font-semibold text-button-text transition-transform active:scale-95"
                    >
                        <Play className="size-5" fill="currentColor" />
                        Play Now
                    </button>
                    <button
                        type="button"
                        className="flex size-13 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-(--glass-panel-bg) backdrop-blur-md transition-all hover:bg-white/5 active:scale-95"
                    >
                        <Info className="size-4 text-whitetext" />
                    </button>
                </div>
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

export default HeroBanner
