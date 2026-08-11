"use client"

import React, { useState } from "react"
import { useArtistAnalyticsStore } from "@/zustandStore/artist/artistStore/artistAnalyticsStore"
import DashboardStats from "@/components/shared/Dashboard/DashboardStats/DashboardStats"
import PeriodSelector from "@/components/artist/dashboard/Analytics/PeriodSelector"
import GrowthOverview from "@/components/artist/dashboard/Analytics/GrowthOverview"
import PeakListeningHours from "@/components/artist/dashboard/Analytics/PeakListeningHours"
import GenreBreakdown from "@/components/artist/dashboard/Analytics/GenreBreakdown"

const ArtistAnalyticsPage = () => {
    const [activePeriod, setActivePeriod] = useState("6M")

    const statsCardsByPeriod = useArtistAnalyticsStore((state) => state.statsCardsByPeriod)
    const growthOverviewStreamDataByRange = useArtistAnalyticsStore((state) => state.growthOverviewStreamDataByRange)
    const growthOverviewContentDataByRange = useArtistAnalyticsStore((state) => state.growthOverviewContentDataByRange)
    const peakListeningHoursData = useArtistAnalyticsStore((state) => state.peakListeningHoursData)
    const genreBreakdownData = useArtistAnalyticsStore((state) => state.genreBreakdownData)

    const statsCards = statsCardsByPeriod?.[activePeriod] || []

    return (
        <div className="flex flex-col gap-6 w-full pb-8">
            <PeriodSelector value={activePeriod} onChange={setActivePeriod} />

            <DashboardStats statsCards={statsCards} />

            {/* Growth Overview charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <GrowthOverview
                    title="Growth Overview"
                    subtitle="Streams vs Follower growth over time"
                    dataByRange={growthOverviewStreamDataByRange}
                    seriesA={{ dataKey: "a", label: "Stream", color: "#3ADFFA", yAxisId: "left", ticks: [0, 40, 80, 120, 160] }}
                    seriesB={{ dataKey: "b", label: "Followers", color: "#CC97FF", yAxisId: "right", ticks: [0, 65, 130, 195, 260] }}
                />
                <GrowthOverview
                    title="Growth Overview"
                    subtitle="Streams vs Follower growth over time"
                    dataByRange={growthOverviewContentDataByRange}
                    seriesA={{ dataKey: "a", label: "Podcast", color: "#3ADFFA", yAxisId: "left", ticks: [0, 40, 80, 120, 160] }}
                    seriesB={{ dataKey: "b", label: "Song", color: "#CC97FF", yAxisId: "right", ticks: [0, 65, 130, 195, 260] }}
                />
            </div>

            {/* Peak hours + genre breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <PeakListeningHours data={peakListeningHoursData} />
                <GenreBreakdown data={genreBreakdownData} />
            </div>
        </div>
    )
}

export default ArtistAnalyticsPage
