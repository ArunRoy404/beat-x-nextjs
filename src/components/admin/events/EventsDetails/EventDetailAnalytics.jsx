"use client"

import React from "react"
import { useEventDetailsAnalyticsStore } from "@/zustandStore/admin/adminStore/eventDetailsAnalyticsStore"
import DashboardStats from "@/components/shared/Dashboard/DashboardStats/DashboardStats"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

const EventDetailAnalytics = ({ event, analytics }) => {
    const storeStatsCards = useEventDetailsAnalyticsStore((state) => state.eventStatsCards)
    const eventPerformanceData = useEventDetailsAnalyticsStore((state) => state.eventPerformanceData)
    const eventPlatformData = useEventDetailsAnalyticsStore((state) => state.eventPlatformData)
    const eventCountryData = useEventDetailsAnalyticsStore((state) => state.eventCountryData)

    const eventStatsCards = analytics
        ? [
            {
                id: 1,
                title: "Tickets Sold",
                value: String(analytics?.ticketsSold ?? 0),
                icon: "Ticket",
                iconColor: "#3ADFFA",
                iconBg: "rgba(58, 223, 250, 0.15)",
            },
            {
                id: 2,
                title: "Total Revenue",
                value: `৳${analytics?.revenue ?? 0}`,
                icon: "Wallet",
                iconColor: "#34C759",
                iconBg: "rgba(52, 199, 89, 0.15)",
            },
            {
                id: 3,
                title: "Avg Daily Sales",
                value: String(analytics?.avgDaily ?? 0),
                icon: "TrendingUp",
                iconColor: "#CC97FF",
                iconBg: "rgba(204, 151, 255, 0.15)",
            },
            {
                id: 4,
                title: "Tickets Remaining",
                value: String(analytics?.ticketsRemaining ?? 0),
                icon: "Clock",
                iconColor: "#FFAE00",
                iconBg: "rgba(254, 174, 0, 0.15)",
            },
        ]
        : storeStatsCards

    const performanceData = analytics?.salesTrend?.length ? analytics.salesTrend : eventPerformanceData
    const platformData = analytics?.byPlatform?.length ? analytics.byPlatform : eventPlatformData
    const countryData = analytics?.byCountry?.length ? analytics.byCountry : eventCountryData

    return (
        <div className="p-4 overflow-y-auto flex-1 min-h-0 scrollbar-thin space-y-5">
            {/* Stats Cards */}
            <DashboardStats statsCards={eventStatsCards} className="grid-cols-2! sm:grid-cols-2! lg:grid-cols-2!" />

            {/* Performance Chart Card */}
            <div className="relative overflow-hidden rounded-[16px] border border-white/10 p-5 bg-[#0E0E0E]">
                {/* Background image layer */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
                    style={{ backgroundImage: "url('/bg-images/card_bg.png')" }}
                />

                <h3 className="text-whitetext text-[16px] font-semibold uppercase tracking-wider mb-4 relative z-10">
                    Ticket Sales
                </h3>

                <div style={{ height: "200px", minHeight: "200px" }} className="w-full z-10 relative">
                    <ResponsiveContainer width="100%" height="100%" minHeight={200} debounce={1000}>
                        <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorEventSales" x1="0" y1="0" x2="0" y2="1">
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
                                ticks={[0, 20, 40, 60, 80]}
                                dx={-5}
                            />
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="bg-[#0E0E0E] border border-white/10 p-2 rounded-[8px] shadow-lg flex flex-col gap-1 text-[11px] text-whitetext">
                                                <p className="text-light-gray font-medium">{payload[0].payload.name}</p>
                                                <p className="text-[#3ADFFA] font-semibold">
                                                    Sales: {payload[0].value}k
                                                </p>
                                            </div>
                                        )
                                    }
                                    return null
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="sales"
                                stroke="#3ADFFA"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorEventSales)"
                                dot={{ r: 4, stroke: "#3ADFFA", strokeWidth: 1.5, fill: "#FFF" }}
                                activeDot={{ r: 6, stroke: "#3ADFFA", strokeWidth: 2, fill: "#0E0E0E" }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Two Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* By Platform */}
                <div className="relative overflow-hidden rounded-[16px] border border-white/10 p-5 bg-[#0E0E0E]">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
                        style={{ backgroundImage: "url('/bg-images/card_bg.png')" }}
                    />
                    <h3 className="text-whitetext text-[16px] font-semibold uppercase tracking-wider mb-4 relative z-10">
                        By Platform
                    </h3>
                    <div className="flex flex-col gap-4 relative z-10">
                        {platformData.map((plat, idx) => (
                            <div key={plat.name || idx} className="flex flex-col gap-1.5">
                                <div className="flex items-center justify-between text-xs font-medium">
                                    <span className="text-light-gray">{plat.name}</span>
                                    <span className="text-whitetext">{plat.value}%</span>
                                </div>
                                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all duration-500"
                                        style={{ width: `${plat.value}%`, backgroundColor: plat.color || "#3ADFFA" }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Countries */}
                <div className="relative overflow-hidden rounded-[16px] border border-white/10 p-5 bg-[#0E0E0E]">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
                        style={{ backgroundImage: "url('/bg-images/card_bg.png')" }}
                    />
                    <h3 className="text-whitetext text-[16px] font-semibold uppercase tracking-wider mb-4 relative z-10">
                        Top Countries
                    </h3>
                    <div className="flex flex-col gap-3 relative z-10">
                        {countryData.map((country, idx) => (
                            <div key={country.name || idx} className="flex items-center justify-between py-1 border-b border-white/5 last:border-0 text-xs font-medium">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm shrink-0">{country.flag || "🌐"}</span>
                                    <span className="text-light-gray">{country.name}</span>
                                </div>
                                <span className="text-whitetext">{country.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventDetailAnalytics
