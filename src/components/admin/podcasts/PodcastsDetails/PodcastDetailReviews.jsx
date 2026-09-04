"use client"

import React from "react"
// Uncomment imports when backend API returns podcast reviews
// import { Star, Eye, EyeOff, Trash2 } from "lucide-react"
// import { Button } from "@/components/ui/button"

/**
 * PodcastDetailReviews Component
 * Note: Styled per project rules since backend API for podcast reviews is not connected/supported yet.
 * Preserved for future backend integration.
 */
const PodcastDetailReviews = ({ podcast }) => {
    return (
        <div className="p-4 overflow-y-auto flex-1 min-h-0 scrollbar-thin space-y-5">
            {/* Empty State placeholder until backend reviews endpoint is available */}
            <div className="flex flex-col items-center justify-center p-8 text-dark-gray text-sm border border-dashed border-white/10 rounded-[16px]">
                <span>Reviews data for &quot;{podcast?.title || "this podcast"}&quot; is not provided by the current API response.</span>
                <span className="text-xs text-light-gray/60 mt-1">Design blocks commented in code awaiting backend integration.</span>
            </div>

            {/* 
            ========================================================================
            COMMENTED DESIGN BLOCKS FOR FUTURE INTEGRATION WHEN BACKEND SUPPORTS REVIEWS:
            ========================================================================
            {/* 
            <div className="flex flex-col gap-3">
                {(podcast?.reviews || []).map((review) => (
                    <div key={review._id} className="border border-white/10 bg-white/5 rounded-[16px] p-3 flex flex-col gap-2">
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1 text-yellow-warning">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? "fill-current" : "opacity-20"}`} />
                                ))}
                            </div>
                        </div>
                        <p className="text-[13px] text-whitetext/90 leading-relaxed">{review.text || "-"}</p>
                    </div>
                ))}
            </div>
            *}
            */}
        </div>
    )
}

export default PodcastDetailReviews
