"use client"

import React from "react"
import DashboardStats from "@/components/shared/Dashboard/DashboardStats/DashboardStats"
import CreateNewEvent from "@/components/admin/events/CreateNewEvent"
import EventsContainer from "@/components/admin/events/EventsContainer/EventsContainer"
import { useEventsDashboardStats } from "@/hooks/api/admin/events/useEventsDashboardStats"

const AdminDashboardEventsPage = () => {
  const { data: statsData } = useEventsDashboardStats()

  const statsCards = [
    {
      id: 1,
      title: "Total Events",
      value: String(statsData?.totalEvents ?? 0),
      icon: "Calendar",
      iconColor: "#3ADFFA",
      iconBg: "rgba(58, 223, 250, 0.15)",
    },
    {
      id: 2,
      title: "Ticket Revenue",
      value: `৳${statsData?.ticketRevenue ?? 0}`,
      icon: "Wallet",
      iconColor: "#34C759",
      iconBg: "rgba(52, 199, 89, 0.15)",
    },
    {
      id: 3,
      title: "Ticket Sold",
      value: String(statsData?.ticketsSold ?? 0),
      icon: "Ticket",
      iconColor: "#CC97FF",
      iconBg: "rgba(204, 151, 255, 0.15)",
    },
    {
      id: 4,
      title: "Completed",
      value: String(statsData?.completedCount ?? 0),
      icon: "CheckCircle",
      iconColor: "#FFAE00",
      iconBg: "rgba(254, 174, 0, 0.15)",
    },
  ]

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
