import React from "react"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import CommonCard from "@/components/shared/CommonCard/CommonCard"

const PeakListeningHours = ({ data = [], mostActiveLabel = "12pm to 9pm" }) => {
    return (
        <CommonCard className="flex flex-col gap-4 h-[380px] w-full">
            <h3 className="text-whitetext text-[16px] font-semibold z-10 relative">
                Peak Listening Hours
            </h3>

            {/* Chart */}
            <div className="flex-1 w-full z-10 relative min-h-0">
                <ResponsiveContainer width="100%" height="100%" debounce={1000}>
                    <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" vertical={false} />
                        <XAxis
                            dataKey="hour"
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
                            ticks={[0, 600, 1200, 1800, 2400]}
                            dx={-5}
                        />
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-[#0E0E0E] border border-border p-2.5 rounded-[8px] shadow-lg flex flex-col gap-1 text-xs">
                                            <p className="text-light-gray font-medium">{payload[0].payload.hour}</p>
                                            <p className="text-[#CC97FF] font-semibold">
                                                Listens: {payload[0].value}
                                            </p>
                                        </div>
                                    )
                                }
                                return null
                            }}
                        />
                        <Bar dataKey="listens" name="Listens" fill="#CC97FF" radius={[4, 4, 0, 0]} maxBarSize={32} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Caption */}
            <p className="text-light-gray text-[13px] text-center z-10 relative">
                Mostly Active :{" "}
                <span className="text-secondary font-semibold">{mostActiveLabel}</span>
            </p>
        </CommonCard>
    )
}

export default PeakListeningHours
