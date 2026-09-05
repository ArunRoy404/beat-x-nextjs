import React from "react"
import { MapPin } from "lucide-react"
import CommonTableTag from "@/components/shared/CommonTable/CommonTableTag"
import EventStatusBadge from "@/components/shared/EventStatusBadge/EventStatusBadge"
import EventDetailsDialog from "@/components/dialogs/artist/events/EventDetailsDialog"
import EventUnderReviewDialog from "@/components/dialogs/artist/events/EventUnderReviewDialog"
import EventDateBadge from "./EventDateBadge"
import EventTicketProgress from "./EventTicketProgress"
import EventsTableActions from "./EventsTableActions"

const EventsCard = ({ event }) => {
    if (!event) return null

    const DetailsWrapper = event.status === "Under Review" ? EventUnderReviewDialog : EventDetailsDialog

    return (
        <DetailsWrapper event={event}>
            <div
                className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 self-stretch rounded-[16px] border bg-[var(--slate-card-bg)] backdrop-blur-[10px] w-full cursor-pointer"
                style={{ borderColor: "var(--slate-card-border)" }}
            >
                {/* Date badge + title/tag/location/progress */}
                <div className="flex items-start gap-4 flex-1 min-w-0">
                    <EventDateBadge date={event?.eventDate} />

                    <div className="flex-1 min-w-0 flex flex-col gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-whitetext text-[18px] sm:text-[24px] font-normal truncate">
                                {event?.title}
                            </h3>
                            <CommonTableTag className="normal-case">{event?.genre}</CommonTableTag>
                        </div>

                        <div className="flex items-center gap-1.5 text-light-gray text-[14px] sm:text-[16px]">
                            <MapPin className="w-4 h-4 shrink-0" />
                            <span className="truncate">{event?.city}</span>
                        </div>

                        <EventTicketProgress ticketsSold={event?.ticketsSold} totalTickets={event?.totalTickets} />
                    </div>
                </div>

                {/* Price / revenue / status / actions */}
                <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 shrink-0">
                    <div className="flex items-center gap-4 sm:gap-6">
                        <div className="flex flex-col items-center gap-0.5">
                            <span className="text-whitetext text-[18px] sm:text-[24px] font-normal leading-none">
                                ৳{event?.ticketPrice}
                            </span>
                            <span className="text-light-gray text-[12px] sm:text-[16px] font-normal leading-none">
                                Per ticket
                            </span>
                        </div>
                        <div className="flex flex-col items-center gap-0.5">
                            <span className="text-whitetext text-[18px] sm:text-[24px] font-normal leading-none">
                                ৳{event?.revenue ?? ((event?.ticketsSold ?? 0) * (event?.ticketPrice ?? 0))}
                            </span>
                            <span className="text-light-gray text-[12px] sm:text-[16px] font-normal leading-none">
                                Revenue
                            </span>
                        </div>
                    </div>

                    <EventStatusBadge status={event?.status} />

                    <EventsTableActions event={event} />
                </div>
            </div>
        </DetailsWrapper>
    )
}

export default EventsCard
