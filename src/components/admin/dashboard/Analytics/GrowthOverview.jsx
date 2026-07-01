import React from "react"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import CommonCard from "@/components/shared/CommonCard/CommonCard"

const GrowthOverview = ({ data }) => {
  return (
    <CommonCard 
      title="Growth Overview"
      subtitle="Streams vs Follower growth over time"
      className="flex flex-col gap-4 h-[450px] w-full"
    >
      {/* Chart */}
      <div className="flex-1 w-full z-10 relative min-h-0">
        <ResponsiveContainer width="100%" height="100%" debounce={1000}>
          <AreaChart data={data || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorAnalyticsStream" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3ADFFA" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3ADFFA" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorAnalyticsFollowers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#CC97FF" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#CC97FF" stopOpacity={0}/>
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
            {/* Left Y Axis for Streams */}
            <YAxis 
              yAxisId="left"
              stroke="rgba(255,255,255,0.3)" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => `${val}k`}
              ticks={[0, 40, 80, 120, 160]}
              dx={-5}
            />
            {/* Right Y Axis for Followers */}
            <YAxis 
              yAxisId="right"
              orientation="right"
              stroke="rgba(255,255,255,0.3)" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => `${val}k`}
              ticks={[0, 65, 130, 195, 260]}
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
            <Area 
              yAxisId="left"
              type="monotone" 
              dataKey="stream" 
              name="Stream" 
              stroke="#3ADFFA" 
              strokeWidth={2} 
              fillOpacity={1}
              fill="url(#colorAnalyticsStream)"
              dot={{ r: 4, stroke: "#3ADFFA", strokeWidth: 1.5, fill: "#FFF" }}
              activeDot={{ r: 6, stroke: "#3ADFFA", strokeWidth: 2, fill: "#0E0E0E" }}
            />
            <Area 
              yAxisId="right"
              type="monotone" 
              dataKey="followers" 
              name="Followers" 
              stroke="#CC97FF" 
              strokeWidth={2} 
              fillOpacity={1}
              fill="url(#colorAnalyticsFollowers)"
              dot={{ r: 4, stroke: "#CC97FF", strokeWidth: 1.5, fill: "#FFF" }}
              activeDot={{ r: 6, stroke: "#CC97FF", strokeWidth: 2, fill: "#0E0E0E" }}
            />
          </AreaChart>
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

export default GrowthOverview
