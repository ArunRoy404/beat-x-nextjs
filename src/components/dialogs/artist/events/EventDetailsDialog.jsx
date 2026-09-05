"use client"

import React, { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import EventDetailHeader from "@/components/artist/events/EventsDetails/EventDetailHeader"
import EventDetailsTabs from "@/components/artist/events/EventsDetails/EventDetailsTabs"
import EventDetailFooter from "@/components/artist/events/EventsDetails/EventDetailFooter"
import { useEventDetail } from "@/hooks/api/admin/events/useEventDetail"

const EventDetailsDialog = ({ event, children }) => {
    const [open, setOpen] = useState(false)
    const eventId = event?._id || event?.id

    const { data: detailData } = useEventDetail(open ? eventId : null)
    const detailedEvent = detailData || event

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {/* asChild target is the whole card <div>, not a <button> — opt out of native-button semantics */}
            <DialogTrigger asChild nativeButton={false}>
                {children}
            </DialogTrigger>

            <DialogContent className="sm:max-w-[672px] p-0 overflow-hidden flex flex-col max-h-[95vh]">
                {/* Screen reader only title for accessibility compliance */}
                <DialogTitle className="sr-only">
                    Event Details - {detailedEvent?.title || "Unknown"}
                </DialogTitle>

                {/* Common Header */}
                <EventDetailHeader event={detailedEvent} />

                {/* Switchable Tabs between Details & Analytics */}
                <EventDetailsTabs event={detailedEvent} />

                {/* Footer with Delete and Close buttons */}
                <EventDetailFooter event={detailedEvent} />
            </DialogContent>
        </Dialog>
    )
}

export default EventDetailsDialog
