"use client"

import React from "react"
import { Star, Eye, EyeOff, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { useAudiobookReviews } from "@/hooks/api/admin/audiobooks/useAudiobookReviews"
import { useModerateAudiobookReview } from "@/hooks/api/admin/audiobooks/useModerateAudiobookReview"
import { useDeleteAudiobookReview } from "@/hooks/api/admin/audiobooks/useDeleteAudiobookReview"
import { cn } from "@/lib/utils"

const AudioBookDetailReviews = ({ book }) => {
  const audiobookId = book?._id

  const { data, isLoading, isError, error, refetch } = useAudiobookReviews(
    audiobookId ? { audiobookId, page: 1, limit: 50 } : undefined
  )

  const { mutate: moderateReview, isPending: isModeratePending } = useModerateAudiobookReview()
  const { mutate: deleteReview, isPending: isDeletePending } = useDeleteAudiobookReview()

  // Real GET /admin/audiobooks/reviews response nests the list under
  // `data.reviews` (same shape as podcast reviews).
  const reviews = Array.isArray(data?.reviews)
    ? data.reviews
    : Array.isArray(data?.data)
    ? data.data
    : Array.isArray(data?.items)
    ? data.items
    : Array.isArray(data)
    ? data
    : []

  const handleToggleHide = (review) => {
    if (!review?._id) return
    moderateReview({
      id: review._id,
      hidden: !review?.hidden,
      reason: review?.hidden ? "Unhidden by admin" : "Hidden by admin",
    })
  }

  const handleDelete = (reviewId) => {
    if (!reviewId) return
    deleteReview({ id: reviewId })
  }

  return (
    <div className="p-4 overflow-y-auto flex-1 min-h-0 scrollbar-thin space-y-4">
      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Spinner className="size-6 text-secondary" />
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
          <span className="text-red-error text-sm">
            {error?.response?.data?.message || error?.message || "Failed to load reviews."}
          </span>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Retry
          </Button>
        </div>
      ) : reviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-light-gray text-sm border border-dashed border-white/10 rounded-[16px] text-center">
          <span>No reviews found for &quot;{book?.title || "this audiobook"}&quot; yet.</span>
          <span className="text-xs text-light-gray/60 mt-1">
            New listener reviews will appear here once submitted.
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {reviews.map((review, index) => {
            const rating = Number(review?.rating) || 0
            const isHidden = Boolean(review?.hidden)

            return (
              <div
                key={review?._id || index}
                className={cn(
                  "border border-white/10 bg-white/5 rounded-[16px] p-4 flex flex-col gap-3 transition-opacity",
                  isHidden && "opacity-60 bg-white/[0.02]"
                )}
              >
                {/* Header: Rating & Status + Actions */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    {/* Stars */}
                    <div className="flex items-center gap-1 text-yellow-warning">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "w-3.5 h-3.5",
                            i < rating ? "fill-current" : "opacity-20"
                          )}
                        />
                      ))}
                    </div>

                    {/* Status Badge */}
                    <span
                      className={cn(
                        "text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full border",
                        isHidden
                          ? "text-red-error border-red-error/30 bg-red-error/10"
                          : "text-green-success border-green-success/30 bg-green-success/10"
                      )}
                    >
                      {isHidden ? "Hidden" : "Visible"}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={isModeratePending}
                      onClick={() => handleToggleHide(review)}
                      className={cn(
                        "h-7 px-2.5 text-[11px] rounded-full gap-1 border",
                        isHidden
                          ? "text-green-success border-green-success/30 bg-green-success/10 hover:bg-green-success/20"
                          : "text-yellow-warning border-yellow-warning/30 bg-yellow-warning/10 hover:bg-yellow-warning/20"
                      )}
                      title={isHidden ? "Unhide review" : "Hide review"}
                    >
                      {isHidden ? (
                        <>
                          <Eye className="w-3 h-3" /> Unhide
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3 h-3" /> Hide
                        </>
                      )}
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      disabled={isDeletePending}
                      onClick={() => handleDelete(review?._id)}
                      className="h-7 w-7 p-0 text-red-error border border-red-error/30 bg-red-error/10 hover:bg-red-error/20 rounded-full"
                      title="Delete review"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-[13px] text-whitetext/90 leading-relaxed break-words">
                  {review?.text || "-"}
                </p>

                {/* Footer User metadata */}
                {(review?.user?.name || review?.userId) && (
                  <div className="flex items-center gap-2 text-[11px] text-light-gray/60 border-t border-white/5 pt-2 mt-0.5">
                    <span>By: {review?.user?.name || (typeof review?.userId === "string" ? `User #${review.userId.slice(-6)}` : "Anonymous")}</span>
                    {review?.createdAt && (
                      <>
                        <span>•</span>
                        <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                      </>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default AudioBookDetailReviews
