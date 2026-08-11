import React from "react"
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts"
import CommonCard from "@/components/shared/CommonCard/CommonCard"

const GenreBreakdown = ({ data = [] }) => {
    return (
        <CommonCard className="flex flex-col gap-4 h-[380px] w-full">
            <h3 className="text-whitetext text-[16px] font-semibold z-10 relative">
                Genre Breakdown
            </h3>

            {/* Donut */}
            <div className="w-[180px] h-[180px] mx-auto shrink-0 relative z-10">
                <ResponsiveContainer width="100%" height="100%" debounce={1000}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={55}
                            outerRadius={75}
                            paddingAngle={3}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                            ))}
                        </Pie>
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-[#0E0E0E] border border-border p-2 rounded-[8px] text-xs">
                                            <p className="font-semibold text-whitetext" style={{ color: payload[0].payload.color }}>
                                                {payload[0].name}: {payload[0].value}%
                                            </p>
                                        </div>
                                    )
                                }
                                return null
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Legend list */}
            <div className="flex-1 flex flex-col gap-2 z-10 relative overflow-y-auto pr-1 custom-scrollbar">
                {data.map((genre, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-white/[0.02] last:border-0">
                        <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: genre.color }} />
                            <span className="text-light-gray font-medium">{genre.name}</span>
                        </div>
                        <span className="font-semibold" style={{ color: genre.color }}>
                            {genre.value}%
                        </span>
                    </div>
                ))}
            </div>
        </CommonCard>
    )
}

export default GenreBreakdown
