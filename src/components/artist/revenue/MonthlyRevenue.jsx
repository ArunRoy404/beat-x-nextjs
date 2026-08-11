import React from "react"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import CommonCard from "@/components/shared/CommonCard/CommonCard"

const MonthlyRevenue = ({ data = [] }) => {
    return (
        <CommonCard className="flex flex-col gap-4 h-[380px] w-full">
            <h3 className="text-whitetext text-[16px] font-semibold z-10 relative">
                Monthly Revenue
            </h3>

            <div className="flex-1 w-full z-10 relative min-h-0">
                <ResponsiveContainer width="100%" height="100%" debounce={1000}>
                    <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
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
                            ticks={[0, 15000, 30000, 45000, 60000]}
                            dx={-5}
                        />
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-[#0E0E0E] border border-border p-2.5 rounded-[8px] shadow-lg flex flex-col gap-1 text-xs">
                                            <p className="text-light-gray font-medium">{payload[0].payload.name}</p>
                                            <p className="text-[#E5F9CF] font-semibold">
                                                Revenue: ৳{payload[0].value.toLocaleString()}
                                            </p>
                                        </div>
                                    )
                                }
                                return null
                            }}
                        />
                        <Bar dataKey="revenue" name="Revenue" fill="#E5F9CF" radius={[4, 4, 0, 0]} maxBarSize={36} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </CommonCard>
    )
}

export default MonthlyRevenue
