import React from "react"
import Image from "next/image"
import { SquarePen } from "lucide-react"
import EditEventDialog from "@/components/dialogs/artist/EditEventDialog"
import EventStatusBadge from "@/components/shared/EventStatusBadge/EventStatusBadge"

const EventDetailHeader = ({ event }) => {
    return (
        <div
            className="p-4 border-b border-white/5 flex items-start justify-between gap-4 shrink-0 relative"
            style={{ background: "var(--modal-header-bg)" }}
        >
            <div className="flex items-start gap-4">
                {/* Cover Art */}
                <Image
                    src={event?.cover || "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=80&w=150"}
                    alt={event?.title || "Event Cover"}
                    width={80}
                    height={80}
                    className="w-[80px] h-[80px] rounded-[16px] object-cover border border-white/10 shrink-0"
                />

                {/* Metadata */}
                <div className="flex flex-col justify-between min-h-[80px] pr-8">
                    <div className="flex flex-col gap-[12px]">
                        {/* Title row */}
                        <div className="flex items-center gap-2 flex-wrap">
                            <h2 className="text-[18px] font-medium text-whitetext not-italic leading-none">
                                {event?.title}
                            </h2>
                            <EventStatusBadge status={event?.status} className="text-[10px] px-2.5 py-0.5" />
                        </div>

                        {/* Subtitle / Artist + City */}
                        <p className="text-[14px] font-normal not-italic text-light-gray leading-none">
                            {event?.artist || "—"} {event?.city ? `· ${event.city}` : ""}
                        </p>
                    </div>

                    {/* Short Stats */}
                    <div className="flex items-center gap-6 mt-3">
                        <div className="flex flex-col gap-[8px]">
                            <span className="text-[16px] font-medium not-italic text-whitetext leading-tight">{event?.ticketsSold ?? "0"}</span>
                            <span className="text-[12px] font-medium not-italic text-dark-gray uppercase tracking-wider">Tickets Sold</span>
                        </div>
                        <div className="w-[1px] h-6 bg-white/10" />
                        <div className="flex flex-col gap-[8px]">
                            <span className="text-[16px] font-medium not-italic text-whitetext leading-tight">৳{event?.revenue || "0"}</span>
                            <span className="text-[12px] font-medium not-italic text-dark-gray uppercase tracking-wider">Revenue</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Absolute Edit Button placed to the left of Close button (Close is at top-4 right-6) */}
            <div className="absolute top-4 right-16 z-50">
                <EditEventDialog event={event}>
                    <button
                        className="h-7 border border-secondary/20 bg-secondary/10 hover:bg-secondary/20 text-secondary text-[11px] font-medium rounded-full px-3 flex items-center gap-1.5 cursor-pointer transition-colors active:scale-95"
                    >
                        <SquarePen className="w-3.5 h-3.5" />
                        Edit
                    </button>
                </EditEventDialog>
            </div>
        </div>
    )
}

export default EventDetailHeader
