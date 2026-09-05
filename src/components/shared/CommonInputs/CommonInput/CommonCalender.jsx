"use client"

import React, { useState, useRef, useEffect, useCallback } from "react"
import { createPortal } from "react-dom"
import { Calendar } from "@/components/ui/calendar"
import { Calendar as CalendarIcon, X } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

const CommonCalender = ({
    value,
    onChange,
    placeholder = "Choose Date",
    label,
    error,
    containerClassName,
    labelClassName,
    className
}) => {
    const [showCalendar, setShowCalendar] = useState(false)
    const [coords, setCoords] = useState({ top: 0, left: 0, width: 280, isTop: false })
    const [isMounted, setIsMounted] = useState(false)
    const buttonRef = useRef(null)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const updatePosition = useCallback(() => {
        if (!buttonRef.current) return
        const rect = buttonRef.current.getBoundingClientRect()
        const viewportHeight = window.innerHeight
        const viewportWidth = window.innerWidth
        const calendarHeight = 320
        const calendarWidth = 280

        const spaceBelow = viewportHeight - rect.bottom
        const isTop = spaceBelow < calendarHeight && rect.top > calendarHeight

        let top = isTop ? rect.top - calendarHeight - 8 : rect.bottom + 8

        // Ensure top is never negative
        if (top < 8) top = 8

        // Align left with button, but keep inside viewport boundaries
        let left = rect.left
        if (left + calendarWidth > viewportWidth - 16) {
            left = Math.max(16, viewportWidth - calendarWidth - 16)
        }

        setCoords({ top, left, width: calendarWidth, isTop })
    }, [])

    const toggleCalendar = () => {
        if (!showCalendar) {
            updatePosition()
        }
        setShowCalendar((prev) => !prev)
    }

    useEffect(() => {
        if (!showCalendar) return

        const handleScrollOrResize = () => {
            updatePosition()
        }

        window.addEventListener("scroll", handleScrollOrResize, true)
        window.addEventListener("resize", handleScrollOrResize)

        return () => {
            window.removeEventListener("scroll", handleScrollOrResize, true)
            window.removeEventListener("resize", handleScrollOrResize)
        }
    }, [showCalendar, updatePosition])

    const handleSelect = (date) => {
        onChange?.(date)
        setShowCalendar(false)
    }

    return (
        <div className={cn("flex flex-col gap-1.5 relative shrink-0", containerClassName)}>
            {label && (
                <label className={cn("text-primary text-[16px] not-italic font-normal font-sans", labelClassName)}>
                    {label}
                </label>
            )}

            <button
                ref={buttonRef}
                type="button"
                onClick={toggleCalendar}
                className={cn(
                    "w-full h-[52px] flex items-center justify-between rounded-full border border-light-gray/20 bg-light-gray/10 px-5 text-[14px] text-left text-whitetext outline-none cursor-pointer hover:border-white/30 transition-all duration-200",
                    showCalendar && "border-primary/50 ring-2 ring-primary/20 bg-light-gray/20",
                    className
                )}
            >
                <span className={value ? "text-whitetext font-medium" : "text-light-gray"}>
                    {value ? format(value, "PPP") : placeholder}
                </span>
                <CalendarIcon className="w-5 h-5 text-light-gray shrink-0" />
            </button>

            {showCalendar && isMounted && createPortal(
                <div className="fixed inset-0 z-[9999] pointer-events-auto">
                    {/* Dark transparent backdrop to dismiss on tap/click */}
                    <div
                        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-150"
                        onClick={() => setShowCalendar(false)}
                    />

                    {/* Floating Calendar Popover Box */}
                    <div
                        style={{
                            position: "fixed",
                            top: `${coords.top}px`,
                            left: `${coords.left}px`,
                        }}
                        className="z-[10000] animate-in fade-in zoom-in-95 duration-150 rounded-[20px] border border-white/10 bg-[#121212]/95 backdrop-blur-2xl p-3 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden w-fit"
                    >
                        <div className="flex items-center justify-between px-2 pb-2 mb-1 border-b border-white/5">
                            <span className="text-[12px] font-semibold text-light-gray uppercase tracking-wider">Select Date</span>
                            <button
                                type="button"
                                onClick={() => setShowCalendar(false)}
                                className="text-light-gray hover:text-whitetext p-1 rounded-full hover:bg-white/10 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <Calendar
                            mode="single"
                            selected={value}
                            onSelect={handleSelect}
                            className="bg-transparent text-whitetext [--cell-size:32px] p-1"
                        />
                    </div>
                </div>,
                document.body
            )}

            {error && (
                <span className="text-red-500 text-xs mt-1">
                    {error}
                </span>
            )}
        </div>
    )
}

export default CommonCalender