import React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const CommonPagination = ({
    currentPage = 1,
    totalItems = 0,
    pageSize = 10,
    totalPages,
    onPageChange,
    className
}) => {
    const calculatedTotalPages = (totalPages ?? Math.ceil(totalItems / pageSize)) || 1
    const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1
    const endItem = Math.min(currentPage * pageSize, totalItems)

    const handlePrev = () => {
        if (currentPage > 1) {
            onPageChange?.(currentPage - 1)
        }
    }

    const handleNext = () => {
        if (currentPage < calculatedTotalPages) {
            onPageChange?.(currentPage + 1)
        }
    }

    const renderPages = () => {
        const pages = []

        if (calculatedTotalPages <= 5) {
            for (let i = 1; i <= calculatedTotalPages; i++) {
                pages.push(i)
            }
        } else {
            // Always show page 1
            pages.push(1)

            if (currentPage > 3) {
                pages.push("ellipsis-1")
            }

            // Show pages around current page
            const start = Math.max(2, currentPage - 1)
            const end = Math.min(calculatedTotalPages - 1, currentPage + 1)

            for (let i = start; i <= end; i++) {
                if (i !== 1 && i !== calculatedTotalPages) {
                    pages.push(i)
                }
            }

            if (currentPage < calculatedTotalPages - 2) {
                pages.push("ellipsis-2")
            }

            // Always show last page
            pages.push(calculatedTotalPages)
        }

        return pages.map((page, index) => {
            if (typeof page === "string") {
                return (
                    <span
                        key={`ellipsis-${index}`}
                        className="w-8 h-8 rounded-[8px] flex items-center justify-center border border-white/10 text-[14px] text-light-gray select-none"
                    >
                        ...
                    </span>
                )
            }

            const isActive = currentPage === page

            return (
                <button
                    key={page}
                    onClick={() => onPageChange?.(page)}
                    className={cn(
                        "w-8 h-8 rounded-[8px] flex items-center justify-center border text-[14px] font-semibold select-none transition-all",
                        isActive
                            ? "bg-secondary border-secondary text-black"
                            : "border-white/10 text-whitetext hover:bg-white/[0.05]"
                    )}
                >
                    {page}
                </button>
            )
        })
    }

    return (
        <div className={cn("flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full px-1 py-2 z-10 relative", className)}>
            {/* Counter Info */}
            <div className="text-light-gray text-[14px] select-none font-normal">
                Showing {startItem} to {endItem} of {totalItems} results
            </div>

            {/* Pagination buttons */}
            <div className="flex items-center gap-1.5">
                {/* Previous Page Button */}
                <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className={cn(
                        "w-8 h-8 rounded-[8px] flex items-center justify-center border border-white/10 text-whitetext select-none transition-all",
                        currentPage === 1
                            ? "opacity-40 cursor-not-allowed"
                            : "hover:bg-white/[0.05]"
                    )}
                >
                    <ChevronLeft className="w-4 h-4" />
                </button>

                {renderPages()}

                {/* Next Page Button */}
                <button
                    onClick={handleNext}
                    disabled={currentPage === calculatedTotalPages}
                    className={cn(
                        "w-8 h-8 rounded-[8px] flex items-center justify-center border border-white/10 text-whitetext select-none transition-all",
                        currentPage === calculatedTotalPages
                            ? "opacity-40 cursor-not-allowed"
                            : "hover:bg-white/[0.05]"
                    )}
                >
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}

export default CommonPagination