import React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

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
                    >
                        ...
                    </span>
                )
            }

            const isActive = currentPage === page

            return (
                <Button
                    notImplemented
                    key={page}
                    onClick={() => onPageChange?.(page)}
                    variant="outline"
                    size="icon"
                    className={cn("px-3! py-3!", isActive ? "bg-secondary border-secondary" : "")}
                >
                    {page}
                </Button>
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
                <Button
                    notImplemented
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    variant="outline"
                    size="icon"
                    className='px-3! py-3!'
                >
                    <ChevronLeft />
                </Button>

                {renderPages()}

                {/* Next Page Button */}
                <Button
                    notImplemented
                    onClick={handleNext}
                    disabled={currentPage === calculatedTotalPages}
                    variant="outline"
                    size="icon"
                    className='px-3! py-3!'
                >
                    <ChevronRight />
                </Button>
            </div>
        </div>
    )
}

export default CommonPagination