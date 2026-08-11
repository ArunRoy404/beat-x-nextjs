"use client"

import React, { useState } from "react"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { cn } from "@/lib/utils"
import CommonCard from "@/components/shared/CommonCard/CommonCard"

const RANGES = ["7D", "30D", "3M"]

const WeeklyStreams = ({ dataByRange }) => {
    const [activeRange, setActiveRange] = useState("3M")
    const data = dataByRange?.[activeRange] || []

    const rangeSwitcher = (
        <div className="flex items-center gap-1.5 z-10 relative">
            {RANGES.map((range) => (
                <button
                    key={range}
                    type="button"
                    onClick={() => setActiveRange(range)}
                    className={cn(
                        "px-2.5 py-1 rounded-full text-[12px] font-medium transition-all cursor-pointer border",
                        activeRange === range
                            ? "bg-secondary/15 text-secondary border-secondary/20"
                            : "text-light-gray border-transparent hover:bg-white/5"
                    )}
                >
                    {range}
                </button>
            ))}
        </div>
    )

    return (
        <CommonCard
            title="Weekly Streams"
            subtitle="Total plays across all tracks"
            tag={rangeSwitcher}
            className="flex flex-col gap-4 h-[380px] w-full"
        >
            {/* Chart */}
            <div className="flex-1 w-full z-10 relative min-h-0">
                <ResponsiveContainer width="100%" height="100%" debounce={1000}>
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorWeeklyStream" x1="0" y1="0" x2="0" y2="1">
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
                            tickFormatter={(val) => `${val}k`}
                            ticks={[0, 3, 6, 9, 12]}
                            dx={-5}
                        />
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-[#0E0E0E] border border-border p-2.5 rounded-[8px] shadow-lg flex flex-col gap-1 text-xs">
                                            <p className="text-light-gray font-medium">{payload[0].payload.name}</p>
                                            <p className="text-[#CC97FF] font-semibold">
                                                Streams: {payload[0].value}k
                                            </p>
                                        </div>
                                    )
                                }
                                return null
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="stream"
                            name="Streams"
                            stroke="#CC97FF"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorWeeklyStream)"
                            activeDot={{ r: 6, stroke: "#CC97FF", strokeWidth: 2, fill: "#0E0E0E" }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </CommonCard>
    )
}

export default WeeklyStreams
