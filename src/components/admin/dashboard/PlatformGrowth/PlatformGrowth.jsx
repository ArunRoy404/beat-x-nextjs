import React from "react"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import CommonCard from "@/components/shared/CommonCard/CommonCard"

const PlatformGrowth = ({ data }) => {
  return (
    <CommonCard 
      title="Platform Growth"
      subtitle="Streams & users over 12 months (Millions)"
      tag={{ text: "Yearly" }}
      className="flex flex-col gap-4 h-[380px] w-full"
    >
      {/* Chart */}
      <div className="flex-1 w-full z-10 relative min-h-0">
        <ResponsiveContainer width="100%" height="100%" debounce={1000}>
          <LineChart data={data || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
              ticks={[0, 4, 8, 12, 16]}
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
                          {p.name}: {p.value}M
                        </p>
                      ))}
                    </div>
                  )
                }
                return null
              }}
            />
            <Line 
              type="monotone" 
              dataKey="stream" 
              name="Stream" 
              stroke="#3ADFFA" 
              strokeWidth={2} 
              dot={false}
              activeDot={{ r: 6, stroke: "#3ADFFA", strokeWidth: 2, fill: "#0E0E0E" }}
            />
            <Line 
              type="monotone" 
              dataKey="followers" 
              name="Followers" 
              stroke="#CC97FF" 
              strokeWidth={2} 
              dot={false}
              activeDot={{ r: 6, stroke: "#CC97FF", strokeWidth: 2, fill: "#0E0E0E" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 z-10 relative text-xs mt-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#3ADFFA]" />
          <span className="text-light-gray">Stream</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#CC97FF]" />
          <span className="text-light-gray">Followers</span>
        </div>
      </div>
    </CommonCard>
  )
}

export default PlatformGrowth
