"use client"

import React from "react"
import { useAdminDashboardEventsStore } from "@/zustandStore/admin/adminStore/adminDashboardEventsStore"
import DashboardStats from "@/components/shared/Dashboard/DashboardStats/DashboardStats"
import CreateNewEvent from "@/components/admin/events/CreateNewEvent"
import EventsContainer from "@/components/admin/events/EventsContainer/EventsContainer"

const AdminDashboardEventsPage = () => {
  const statsCards = useAdminDashboardEventsStore((state) => state.eventsStatsCards)

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

export default AdminDashboardEventsPage
