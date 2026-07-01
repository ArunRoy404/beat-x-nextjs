import React from "react"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import CommonCard from "@/components/shared/CommonCard/CommonCard"

const RevenueStreams = ({ data }) => {
  return (
    <CommonCard 
      title="Revenue Streams"
      subtitle="6-month breakdown (৳K)"
      className="flex flex-col gap-4 h-[380px] w-full"
    >
      {/* Chart */}
      <div className="flex-1 w-full z-10 relative min-h-0">
        <ResponsiveContainer width="100%" height="100%" debounce={1000}>
          <BarChart data={data || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barGap={3}>
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
              tickFormatter={(val) => val}
              ticks={[0, 90, 180, 270, 360]}
              dx={-5}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-[#0E0E0E] border border-border p-2.5 rounded-[8px] shadow-lg flex flex-col gap-1 text-xs">
                      <p className="text-light-gray font-medium">{payload[0].payload.name}</p>
                      {payload.map((p, idx) => (
                        <p key={idx} style={{ color: p.color }} className="font-semibold">
                          {p.name}: ৳{p.value}K
                        </p>
                      ))}
                    </div>
                  )
                }
                return null
              }}
            />
            <Bar dataKey="subscription" name="Subscription" fill="#3ADFFA" radius={[4, 4, 0, 0]} maxBarSize={12} />
            <Bar dataKey="store" name="Store" fill="#CC97FF" radius={[4, 4, 0, 0]} maxBarSize={12} />
            <Bar dataKey="events" name="Events" fill="#E5F9CF" radius={[4, 4, 0, 0]} maxBarSize={12} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 z-10 relative text-xs mt-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#3ADFFA]" />
          <span className="text-light-gray">Subscription</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#CC97FF]" />
          <span className="text-light-gray">Store</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E5F9CF]" />
          <span className="text-light-gray">Events</span>
        </div>
      </div>
    </CommonCard>
  )
}

export default RevenueStreams
