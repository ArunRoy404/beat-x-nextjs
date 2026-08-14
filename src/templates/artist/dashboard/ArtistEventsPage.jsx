"use client"

import React from "react"
import { useArtistEventsStore } from "@/zustandStore/artist/artistStore/artistEventsStore"
import DashboardStats from "@/components/shared/Dashboard/DashboardStats/DashboardStats"
import CreateNewEvent from "@/components/artist/events/CreateNewEvent"
import EventsContainer from "@/components/artist/events/EventsContainer/EventsContainer"

const ArtistEventsPage = () => {
  const statsCards = useArtistEventsStore((state) => state.eventsStatsCards)

  return (
    <div className="flex flex-col gap-6 w-full pb-8">
      {/* Upper Stats grid */}
      <DashboardStats statsCards={statsCards} />

      {/* Create event selector container */}
      <CreateNewEvent />

      {/* Events collection container */}
      <EventsContainer />
    </div>
  )
}

export default ArtistEventsPage
