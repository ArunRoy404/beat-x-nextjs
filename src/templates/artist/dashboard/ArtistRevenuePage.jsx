"use client"

import React from "react"
import { useArtistRevenueStore } from "@/zustandStore/artist/artistStore/artistRevenueStore"
import DashboardStats from "@/components/shared/Dashboard/DashboardStats/DashboardStats"
import RevenueByType from "@/components/artist/revenue/RevenueByType"
import MonthlyRevenue from "@/components/artist/revenue/MonthlyRevenue"
import TransactionHistory from "@/components/artist/revenue/TransactionHistory"

const ArtistRevenuePage = () => {
    const statsCards = useArtistRevenueStore((state) => state.revenueStatsCards)
    const revenueByType = useArtistRevenueStore((state) => state.revenueByType)
    const monthlyRevenueData = useArtistRevenueStore((state) => state.monthlyRevenueData)

    return (
        <div className="flex flex-col gap-6 w-full pb-8">
            <DashboardStats statsCards={statsCards} />

            {/* Revenue by Type + Monthly Revenue */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <RevenueByType data={revenueByType} />
                <MonthlyRevenue data={monthlyRevenueData} />
            </div>

            {/* Transaction History */}
            <TransactionHistory />
        </div>
    )
}

export default ArtistRevenuePage
