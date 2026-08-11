"use client"

import React from "react"
import Image from "next/image"
import CommonInfoBox from "@/components/shared/CommonInfoBox/CommonInfoBox"

const EventDetailContent = ({ event }) => {
    return (
        /* Scrollable Body Content */
        <div className="p-4 flex flex-col gap-5 overflow-y-auto flex-1 min-h-0 scrollbar-thin">
            <div className="grid grid-cols-2 gap-4">
                {/* Thumbnail Box (Full Width) */}
                <div className="col-span-2 border border-white/10 bg-white/5 rounded-[16px] p-4 flex flex-col gap-2">
                    <span className="text-[12px] text-dark-gray font-normal uppercase tracking-wider">Thumbnail</span>
                    <div className="relative w-full h-40 rounded-[16px] overflow-hidden border border-white/10">
                        <Image
                            src={event?.cover || "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=80&w=400"}
                            alt="Thumbnail"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover rounded-[16px]"
                        />
                    </div>
                </div>

                {/* Info rows */}
                <CommonInfoBox label="Venue" value={event?.venue} />
                <CommonInfoBox label="City" value={event?.city} />
                <CommonInfoBox label="Event Date" value={event?.eventDate} />
                <CommonInfoBox label="Event Time" value={event?.eventTime} />
                <CommonInfoBox label="Ticket Price" value={event?.ticketPrice ? `৳${event.ticketPrice}` : "-"} />
                <CommonInfoBox label="Total Tickets" value={event?.totalTickets} />

                {/* Description Box (Full Width) */}
                <div className="col-span-2 border border-white/10 bg-white/5 rounded-[16px] p-3 px-4 flex flex-col gap-1.5 w-full">
                    <span className="text-[12px] text-dark-gray font-normal not-italic uppercase tracking-wider">About this Event</span>
                    <span className="text-[13px] text-whitetext/90 leading-relaxed font-normal">
                        {event?.description || `${event?.title} at ${event?.venue}, ${event?.city}.`}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default EventDetailContent
