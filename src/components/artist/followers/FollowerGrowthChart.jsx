"use client"

import React from "react"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { useArtistFollowersStore } from "@/zustandStore/artist/artistStore/artistFollowersStore"
import CommonCard from "@/components/shared/CommonCard/CommonCard"

const FollowerGrowthChart = () => {
    const data = useArtistFollowersStore((state) => state.followerGrowthData)

    return (
        <CommonCard
            title="Follower Growth"
            subtitle="Last 6 Months"
            className="flex flex-col gap-4 h-[380px] w-full"
        >
            {/* Chart */}
            <div className="flex-1 w-full z-10 relative min-h-0">
                <ResponsiveContainer width="100%" height="100%" debounce={1000}>
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorFollowerGrowth" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#CC97FF" stopOpacity={0.35} />
                                <stop offset="95%" stopColor="#CC97FF" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" vertical={false} />
                        <XAxis
                            dataKey="name"
                            stroke="rgba(255,255,255,0.3)"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            dy={10}
                        />
                        <YAxis
                            stroke="rgba(255,255,255,0.3)"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(val) => `${val}K`}
                            ticks={[0, 65, 130, 195, 260]}
                            dx={-5}
                        />
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-[#0E0E0E] border border-border p-2.5 rounded-[8px] shadow-lg flex flex-col gap-1 text-xs">
                                            <p className="text-light-gray font-medium">{payload[0].payload.name}</p>
                                            <p className="text-[#CC97FF] font-semibold">
                                                Followers: {payload[0].value}K
                                            </p>
                                        </div>
                                    )
                                }
                                return null
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="followers"
                            name="Followers"
                            stroke="#CC97FF"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorFollowerGrowth)"
                            activeDot={{ r: 6, stroke: "#CC97FF", strokeWidth: 2, fill: "#0E0E0E" }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </CommonCard>
    )
}

export default FollowerGrowthChart
