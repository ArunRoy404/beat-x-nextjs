"use client"

import React from "react"
// Uncomment imports when backend API returns video analytics metrics/charts
// import DashboardStats from "@/components/shared/Dashboard/DashboardStats/DashboardStats"
// import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

/**
 * VideoDetailAnalytics Component
 * Note: Styled per project rules since backend endpoint GET /api/v1/admin/videos/:id
 * does not currently return individual video analytics data (stream charts, retention breakdown, device stats).
 * Preserved for future backend integration.
 */
const VideoDetailAnalytics = ({ video }) => {
    return (
        <div className="p-4 overflow-y-auto flex-1 min-h-0 scrollbar-thin space-y-5">
            {/* Empty State placeholder until backend analytics endpoint is available */}
            <div className="flex flex-col items-center justify-center p-8 text-dark-gray text-sm border border-dashed border-white/10 rounded-[16px] text-center">
                <span>Analytics data for &quot;{video?.title || "this video"}&quot; is not provided by the current API response.</span>
                <span className="text-xs text-light-gray/60 mt-1">Design blocks commented in code awaiting backend integration.</span>
            </div>

            {/* 
            ========================================================================
            COMMENTED DESIGN BLOCKS FOR FUTURE INTEGRATION WHEN BACKEND SUPPORTS ANALYTICS:
            ========================================================================

            {/* Stats Cards Grid - 4 cards *}
            {/* <DashboardStats statsCards={video?.statsCards || []} className="grid-cols-2! sm:grid-cols-2! lg:grid-cols-2!" /> *}

            {/* Views Over Time Chart *}
            {/* 
            <div className="relative overflow-hidden rounded-[16px] border border-white/10 p-5 bg-[#0E0E0E]">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
                    style={{ backgroundImage: "url('/bg-images/card_bg.png')" }}
                />

                <h3 className="text-whitetext text-[16px] font-semibold uppercase tracking-wider mb-4 relative z-10 font-sans">
                    Views Over Time
                </h3>

                <div style={{ height: "240px", minHeight: "240px" }} className="w-full z-10 relative">
                    <ResponsiveContainer width="100%" height="100%" minHeight={240} debounce={1000}>
                        <AreaChart data={video?.performanceData || []} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorVideoViews" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3ADFFA" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#3ADFFA" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" vertical={false} />
                            <XAxis
                                dataKey="name"
                                stroke="rgba(255,255,255,0.3)"
                                fontSize={11}
                                tickLine={false}
                                axisLine={false}
                                dy={8}
                            />
                            <YAxis
                                stroke="rgba(255,255,255,0.3)"
                                fontSize={11}
                                tickLine={false}
                                axisLine={false}
                                ticks={[0, 10, 20, 30, 40]}
                                dx={-5}
                            />
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="bg-[#0E0E0E] border border-white/10 p-2 rounded-[8px] shadow-lg flex flex-col gap-1 text-[11px] text-whitetext font-sans">
                                                <span className="text-[#888]">{payload[0].payload.name}</span>
                                                <span className="font-semibold text-secondary">{payload[0].value}k views</span>
                                            </div>
                                        )
                                    }
                                    return null
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="views"
                                stroke="#3ADFFA"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorVideoViews)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
            *}
            */}
        </div>
    )
}

export default VideoDetailAnalytics
