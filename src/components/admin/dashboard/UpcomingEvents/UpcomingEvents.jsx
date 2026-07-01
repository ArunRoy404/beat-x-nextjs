import React from "react"
import CommonCard from "@/components/shared/CommonCard/CommonCard"
import EventCard from "./EventCard"

const UpcomingEvents = ({ data }) => {
  return (
    <CommonCard
      title="Upcoming Events"
      subtitle="Scheduled shows & events"
      link={{ text: "View All", href: "/admin/dashboard/events" }}
      className="flex flex-col gap-4 h-[380px] w-full"
    >
      {/* Scrollable Event List */}
      <div className="flex-1 flex flex-col gap-3 z-10 relative overflow-y-auto pr-1 custom-scrollbar">
        {(data || []).map((event, index) => (
          <EventCard key={event?.id || index} event={event} />
        ))}
      </div>
    </CommonCard>
  )
}

export default UpcomingEvents
