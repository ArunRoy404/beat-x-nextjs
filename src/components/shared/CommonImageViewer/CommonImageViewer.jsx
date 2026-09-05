"use client"

import React, { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { resolveMediaUrl } from "@/lib/format/resolveMediaUrl"

const CommonImageViewer = ({
    isOpen,
    onClose,
    images = [],
    initialIndex = 0,
    title = "",
}) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex)

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        startIndex: initialIndex,
    })

    // Scroll to initial index on open
    useEffect(() => {
        if (isOpen && emblaApi) {
            emblaApi.scrollTo(initialIndex, true)
            setCurrentIndex(initialIndex)
        }
    }, [isOpen, emblaApi, initialIndex])

    // Update active slide index when Embla carousel snaps
    useEffect(() => {
        if (!emblaApi) return
        const onSelect = () => {
            setCurrentIndex(emblaApi.selectedScrollSnap())
        }
        emblaApi.on("select", onSelect)
        onSelect()
        return () => {
            emblaApi.off("select", onSelect)
        }
    }, [emblaApi])

    const handlePrev = useCallback(() => {
        emblaApi?.scrollPrev()
    }, [emblaApi])

    const handleNext = useCallback(() => {
        emblaApi?.scrollNext()
    }, [emblaApi])

    // Keyboard navigation (Esc, Arrow Left, Arrow Right)
    useEffect(() => {
        if (!isOpen) return

        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose?.()
            if (e.key === "ArrowLeft") handlePrev()
            if (e.key === "ArrowRight") handleNext()
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [isOpen, onClose, handlePrev, handleNext])

    if (!isOpen || !images || images.length === 0) return null

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-background/95 backdrop-blur-2xl animate-in fade-in duration-200 select-none overflow-hidden">
            {/* Top Bar Header */}
            <div className="w-full p-4 sm:p-6 flex items-center justify-between z-20 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
                <div className="flex items-center gap-3">
                    {title && (
                        <h3 className="text-whitetext text-sm sm:text-base font-semibold truncate max-w-[200px] sm:max-w-md">
                            {title}
                        </h3>
                    )}
                    {images.length > 1 && (
                        <span className="text-xs text-light-gray bg-white/10 border border-whitetext/10 px-2.5 py-0.5 rounded-full font-sans font-medium">
                            {currentIndex + 1} / {images.length}
                        </span>
                    )}
                </div>

                <button
                    onClick={onClose}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-whitetext/10 bg-white/5 hover:bg-white/15 text-light-gray hover:text-whitetext flex items-center justify-center transition-all cursor-pointer"
                    aria-label="Close image viewer"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Main Embla Carousel Area */}
            <div className="relative w-full flex-1 flex items-center justify-center overflow-hidden">
                <div ref={emblaRef} className="w-full h-full overflow-hidden cursor-grab active:cursor-grabbing">
                    <div className="flex h-full">
                        {images.map((img, idx) => {
                            const url = typeof img === "string" ? img : img?.url || img?.src
                            return (
                                <div
                                    key={idx}
                                    className="relative flex-none w-full h-full flex items-center justify-center p-4 sm:p-12"
                                >
                                    <div className="relative w-full max-w-4xl h-[60vh] sm:h-[72vh] flex items-center justify-center">
                                        {url ? (
                                            <Image
                                                src={resolveMediaUrl(url)}
                                                alt={title || `Image ${idx + 1}`}
                                                fill
                                                unoptimized
                                                className="object-contain drop-shadow-2xl pointer-events-none"
                                            />
                                        ) : (
                                            <div className="text-light-gray text-sm font-sans">
                                                Image unavailable
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Desktop Navigation Arrows */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={handlePrev}
                        className="hidden sm:flex absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-whitetext/15 bg-dark-accent/70 hover:bg-dark-accent text-whitetext hover:text-secondary hover:border-secondary/40 items-center justify-center transition-all cursor-pointer backdrop-blur-md z-20"
                        aria-label="Previous image"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                        onClick={handleNext}
                        className="hidden sm:flex absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-whitetext/15 bg-dark-accent/70 hover:bg-dark-accent text-whitetext hover:text-secondary hover:border-secondary/40 items-center justify-center transition-all cursor-pointer backdrop-blur-md z-20"
                        aria-label="Next image"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </>
            )}

            {/* Bottom Thumbnails Navigation Strip */}
            {images.length > 1 && (
                <div className="w-full pb-4 sm:pb-6 px-4 flex items-center justify-center z-20">
                    <div className="flex items-center gap-2.5 bg-dark-accent/80 border border-whitetext/10 rounded-2xl p-2 backdrop-blur-lg max-w-full overflow-x-auto scrollbar-none">
                        {images.map((img, idx) => {
                            const url = typeof img === "string" ? img : img?.url || img?.src
                            const isSelected = idx === currentIndex

                            return (
                                <button
                                    key={idx}
                                    onClick={() => emblaApi?.scrollTo(idx)}
                                    className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                                        isSelected
                                            ? "border-secondary scale-105 shadow-md shadow-secondary/25"
                                            : "border-whitetext/10 opacity-50 hover:opacity-100"
                                    }`}
                                >
                                    <Image
                                        src={resolveMediaUrl(url)}
                                        alt={`Thumbnail ${idx + 1}`}
                                        fill
                                        unoptimized
                                        className="object-cover"
                                    />
                                </button>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}

export default CommonImageViewer
