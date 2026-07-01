import React from "react"
import { Ticket } from "lucide-react"

const EventCard = ({ event }) => {
  if (!event) return null

  return (
    <div className="flex items-center justify-between p-4 rounded-[12px] bg-[#141413] border border-white/[0.05] gap-4 w-full">
      {/* Left Columns: Date + Text Info */}
      <div className="flex items-center gap-4 min-w-0">
        {/* Date block */}
        <div className="flex flex-col items-center justify-center w-14 h-14 rounded-[8px] bg-[#20201F] border border-white/[0.05] shrink-0 select-none">
          <span className="text-[10px] font-medium text-dark-gray tracking-wider uppercase leading-none mb-1">
            {event?.month || "MON"}
          </span>
          <span className="text-[20px] font-bold text-whitetext leading-none">
            {event?.day || "00"}
          </span>
        </div> 

        {/* Text details */}
        <div className="flex flex-col min-w-0">
          <span className="text-whitetext text-[16px] font-medium truncate">
            {event?.title || "TBD Event"}
          </span>
          <span className="text-dark-gray text-[14px] truncate mt-0.5">
            {event?.location || "Online"}
          </span>
          
          {/* Ticket count progress */}
          <div className="flex items-center gap-1.5 text-green-success text-[12px] mt-1.5">
            <Ticket className="w-3.5 h-3.5 shrink-0" />
            <span>{event?.ticketsSold || "0 tickets sold"}</span>
          </div>
        </div>
      </div>

      {/* Right Column: Status */}
      <span className="border border-secondary bg-[#3ADFFA]/10 text-secondary rounded-full px-2.5 py-0.5 text-[11px] font-medium shrink-0">
        {event?.status || "Upcoming"}
      </span>
    </div>
  )
}

export default EventCard
