"use client"

import React from "react"
import { useVideoDetailsAnalyticsStore } from "@/zustandStore/admin/adminStore/videoDetailsAnalyticsStore"
import DashboardStats from "@/components/shared/Dashboard/DashboardStats/DashboardStats"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

const VideoDetailAnalytics = () => {
    const statsCards = useVideoDetailsAnalyticsStore((state) => state.videoStatsCards)
    const performanceData = useVideoDetailsAnalyticsStore((state) => state.videoPerformanceData)
    const retentionData = useVideoDetailsAnalyticsStore((state) => state.videoRetentionData)
    const deviceData = useVideoDetailsAnalyticsStore((state) => state.videoDeviceData)

    return (
        <div className="p-4 flex flex-col gap-5 overflow-y-auto flex-1 min-h-0 scrollbar-thin">
            {/* Stats Cards Grid - 4 cards */}
            <DashboardStats statsCards={statsCards} className="grid-cols-2! sm:grid-cols-2! lg:grid-cols-4!" />

            {/* Views Over Time Chart */}
            <div className="relative overflow-hidden rounded-[16px] border border-white/10 p-5 bg-[#0E0E0E]">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
                    style={{ backgroundImage: "url('/bg-images/card_bg.png')" }}
                />

                <h3 className="text-whitetext text-[16px] font-semibold uppercase tracking-wider mb-4 relative z-10 font-sans">
                    Views Over Time
                </h3>

                <div className="h-[200px] w-full z-10 relative min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
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
                                                <p className="text-light-gray font-medium">{payload[0].payload.name}</p>
                                                <p className="text-[#3ADFFA] font-semibold font-sans">
                                                    Views: {payload[0].value}M
                                                </p>
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
                                dot={{ r: 4, stroke: "#3ADFFA", strokeWidth: 1.5, fill: "#FFF" }}
                                activeDot={{ r: 6, stroke: "#3ADFFA", strokeWidth: 2, fill: "#0E0E0E" }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Two Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Chapter Drop-off Progress Bars */}
                <div className="relative overflow-hidden rounded-[16px] border border-white/10 p-5 bg-[#0E0E0E]">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
                        style={{ backgroundImage: "url('/bg-images/card_bg.png')" }}
                    />
                    <h3 className="text-whitetext text-[16px] font-semibold uppercase tracking-wider mb-4 relative z-10 font-sans">
                        Chapter Drop-off
                    </h3>
                    <div className="flex flex-col gap-4 relative z-10">
                        {retentionData.map((item) => (
                            <div key={item.name} className="flex flex-col gap-1.5">
                                <div className="flex items-center justify-between text-xs font-medium font-sans">
                                    <span className="text-light-gray">{item.name}</span>
                                    <span className="text-whitetext">{item.value}%</span>
                                </div>
                                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all duration-500"
                                        style={{ width: `${item.value}%`, backgroundColor: item.color }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Device Breakdown Progress Bars */}
                <div className="relative overflow-hidden rounded-[16px] border border-white/10 p-5 bg-[#0E0E0E]">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
                        style={{ backgroundImage: "url('/bg-images/card_bg.png')" }}
                    />
                    <h3 className="text-whitetext text-[16px] font-semibold uppercase tracking-wider mb-4 relative z-10 font-sans">
                        Device Breakdown
                    </h3>
                    <div className="flex flex-col gap-4 relative z-10">
                        {deviceData.map((item) => (
                            <div key={item.name} className="flex flex-col gap-1.5">
                                <div className="flex items-center justify-between text-xs font-medium font-sans">
                                    <span className="text-light-gray">{item.name}</span>
                                    <span className="text-whitetext">{item.value}%</span>
                                </div>
                                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all duration-500"
                                        style={{ width: `${item.value}%`, backgroundColor: item.color }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoDetailAnalytics
