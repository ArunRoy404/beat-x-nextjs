"use client"

import React from "react"
import { useArtistDashboardOverviewStore } from "@/zustandStore/artist/artistStore/artistDashboardOverviewStore"
import DashboardStats from "@/components/shared/Dashboard/DashboardStats/DashboardStats"
import WeeklyStreams from "@/components/artist/dashboard/WeeklyStreams/WeeklyStreams"
import RevenueOverview from "@/components/artist/dashboard/RevenueOverview/RevenueOverview"
import TopTracksTable from "@/components/artist/dashboard/TopTracks/TopTracksTable"
import TopTracksList from "@/components/artist/dashboard/TopTracks/TopTracksList"
import RecentActivity from "@/components/shared/Dashboard/RecentActivity/RecentActivity"
import UpcomingEvents from "@/components/shared/Dashboard/UpcomingEvents/UpcomingEvents"

const ArtistDashboardOverviewPage = () => {
    const statsCards = useArtistDashboardOverviewStore((state) => state.statsCards)
    const weeklyStreamsDataByRange = useArtistDashboardOverviewStore((state) => state.weeklyStreamsDataByRange)
    const revenueOverviewData = useArtistDashboardOverviewStore((state) => state.revenueOverviewData)
    const topTracksTableData = useArtistDashboardOverviewStore((state) => state.topTracksTableData)
    const topTracksListData = useArtistDashboardOverviewStore((state) => state.topTracksListData)
    const recentActivity = useArtistDashboardOverviewStore((state) => state.recentActivityData)
    const upcomingEvents = useArtistDashboardOverviewStore((state) => state.upcomingEventsData)

    return (
        <div className="flex flex-col gap-6 w-full pb-8">
            <DashboardStats statsCards={statsCards} />

            {/* Charts and Lists Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <WeeklyStreams dataByRange={weeklyStreamsDataByRange} />
                <RevenueOverview data={revenueOverviewData} />
                <TopTracksTable data={topTracksTableData} viewAllHref="/artist/dashboard/music" />
                <TopTracksList data={topTracksListData} viewAllHref="/artist/dashboard/music" />
                <RecentActivity data={recentActivity} />
                <UpcomingEvents data={upcomingEvents} viewAllHref="/artist/dashboard/events" />
            </div>
        </div>
    )
}

export default ArtistDashboardOverviewPage
