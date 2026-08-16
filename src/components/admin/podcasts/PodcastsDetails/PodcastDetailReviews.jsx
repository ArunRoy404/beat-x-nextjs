"use client"

import React, { useState } from "react"
import { Star, Eye, EyeOff, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import CommonPagination from "@/components/shared/CommonPagination/CommonPagination"
import { usePodcastReviews } from "@/hooks/api/admin/podcasts/usePodcastReviews"
import { useModerateReview } from "@/hooks/api/admin/podcasts/useModerateReview"
import { useDeleteReview } from "@/hooks/api/admin/podcasts/useDeleteReview"

const REVIEWS_PAGE_SIZE = 10

const PodcastDetailReviews = ({ podcastId }) => {
    const [page, setPage] = useState(1)
    const { data, isLoading } = usePodcastReviews({ podcastId, page, limit: REVIEWS_PAGE_SIZE })
    const { mutate: moderateReview } = useModerateReview()
    const { mutate: deleteReview } = useDeleteReview()

    const reviews = data?.data ?? []
    const total = data?.total ?? 0
    const totalPages = Math.ceil(total / REVIEWS_PAGE_SIZE) || 1

    const handleToggleHidden = (review) => {
        moderateReview(
            { id: review._id, hidden: !review.hidden },
            {
                onSuccess: () => toast.success(review.hidden ? "Review unhidden." : "Review hidden."),
                onError: (error) => toast.error(error?.message || "Failed to update review."),
            }
        )
    }

    const handleDelete = (review) => {
        deleteReview(
            { id: review._id },
            {
                onSuccess: () => toast.success("Review deleted."),
                onError: (error) => toast.error(error?.message || "Failed to delete review."),
            }
        )
    }

    return (
        <div className="p-4 flex flex-col gap-3 overflow-y-auto flex-1 min-h-0 scrollbar-thin">
            {isLoading ? (
                <div className="flex items-center justify-center py-16">
                    <Spinner className="size-6 text-secondary" />
                </div>
            ) : reviews.length === 0 ? (
                <div className="py-16 text-center text-muted-foreground text-sm">No reviews yet.</div>
            ) : (
                <>
                    {reviews.map((review) => (
                        <div key={review._id} className="border border-white/10 bg-white/5 rounded-[16px] p-3 flex flex-col gap-2">
                            <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-1 text-yellow-warning">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? "fill-current" : "opacity-20"}`} />
                                    ))}
                                </div>
                                {review.hidden && (
                                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full border bg-yellow-warning/15 text-yellow-warning border-yellow-warning/20">
                                        Hidden
                                    </span>
                                )}
                            </div>
                            <p className="text-[13px] text-whitetext/90 leading-relaxed">{review.text || "-"}</p>
                            <div className="flex items-center justify-end gap-2 mt-1">
                                <Button
                                    onClick={() => handleToggleHidden(review)}
                                    variant="outline"
                                    size="sm"
                                    className="rounded-full text-[12px] h-7 px-3"
                                >
                                    {review.hidden ? <Eye className="w-3.5 h-3.5 mr-1" /> : <EyeOff className="w-3.5 h-3.5 mr-1" />}
                                    {review.hidden ? "Unhide" : "Hide"}
                                </Button>
                                <Button
                                    onClick={() => handleDelete(review)}
                                    title="Delete Review"
                                    size="icon"
                                    variant="outline"
                                    className="text-red-error border border-red-error/20 bg-red-error/10 rounded-full h-7 w-7"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </Button>
                            </div>
                        </div>
                    ))}

                    <CommonPagination
                        currentPage={page}
                        totalItems={total}
                        pageSize={REVIEWS_PAGE_SIZE}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                </>
            )}
        </div>
    )
}

export default PodcastDetailReviews
