"use client"

import React, { useState } from "react"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { cn } from "@/lib/utils"
import CommonCard from "@/components/shared/CommonCard/CommonCard"

const RANGES = ["7D", "30D", "3M"]

const GrowthOverview = ({ title, subtitle, dataByRange, seriesA, seriesB }) => {
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
            title={title}
            subtitle={subtitle}
            tag={rangeSwitcher}
            className="flex flex-col gap-4 h-[380px] w-full"
        >
            {/* Chart */}
            <div className="flex-1 w-full z-10 relative min-h-0">
                <ResponsiveContainer width="100%" height="100%" debounce={1000}>
                    <LineChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
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
                            yAxisId={seriesA.yAxisId}
                            stroke="rgba(255,255,255,0.3)"
                            fontSize={11}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(val) => `${val}k`}
                            ticks={seriesA.ticks}
                            dx={-5}
                        />
                        <YAxis
                            yAxisId={seriesB.yAxisId}
                            orientation="right"
                            stroke="rgba(255,255,255,0.3)"
                            fontSize={11}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(val) => `${val}k`}
                            ticks={seriesB.ticks}
                            dx={5}
                        />
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-[#0E0E0E] border border-border p-2.5 rounded-[8px] shadow-lg flex flex-col gap-1 text-xs">
                                            <p className="text-light-gray font-medium">{payload[0].payload.name}</p>
                                            {payload.map((p, idx) => (
                                                <p key={idx} style={{ color: p.color }} className="font-semibold">
                                                    {p.name}: {p.value}k
                                                </p>
                                            ))}
                                        </div>
                                    )
                                }
                                return null
                            }}
                        />
                        <Line
                            yAxisId={seriesA.yAxisId}
                            type="monotone"
                            dataKey={seriesA.dataKey}
                            name={seriesA.label}
                            stroke={seriesA.color}
                            strokeWidth={2}
                            dot={{ r: 4, stroke: seriesA.color, strokeWidth: 1.5, fill: "#0E0E0E" }}
                            activeDot={{ r: 6, stroke: seriesA.color, strokeWidth: 2, fill: "#0E0E0E" }}
                        />
                        <Line
                            yAxisId={seriesB.yAxisId}
                            type="monotone"
                            dataKey={seriesB.dataKey}
                            name={seriesB.label}
                            stroke={seriesB.color}
                            strokeWidth={2}
                            dot={{ r: 4, stroke: seriesB.color, strokeWidth: 1.5, fill: "#0E0E0E" }}
                            activeDot={{ r: 6, stroke: seriesB.color, strokeWidth: 2, fill: "#0E0E0E" }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 z-10 relative text-xs mt-1">
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: seriesA.color }} />
                    <span className="text-light-gray">{seriesA.label}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: seriesB.color }} />
                    <span className="text-light-gray">{seriesB.label}</span>
                </div>
            </div>
        </CommonCard>
    )
}

export default GrowthOverview
