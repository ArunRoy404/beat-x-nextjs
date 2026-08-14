"use client"

import React, { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import EventDetailHeader from "@/components/admin/events/EventsDetails/EventDetailHeader"
import EventDetailsTabs from "@/components/admin/events/EventsDetails/EventDetailsTabs"
import EventDetailFooter from "@/components/admin/events/EventsDetails/EventDetailFooter"

const EventDetailsDialog = ({ event, children }) => {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {/* asChild target is the whole card <div>, not a <button> — opt out of native-button semantics */}
            <DialogTrigger asChild nativeButton={false}>
                {children}
            </DialogTrigger>

            <DialogContent className="sm:max-w-[672px] p-0 overflow-hidden flex flex-col max-h-[95vh]">
                {/* Screen reader only title for accessibility compliance */}
                <DialogTitle className="sr-only">
                    Event Details - {event?.title || "Unknown"}
                </DialogTitle>

                {/* Common Header */}
                <EventDetailHeader event={event} />

                {/* Switchable Tabs between Details & Analytics */}
                <EventDetailsTabs event={event} />

                {/* Footer with Delete and Close buttons */}
                <EventDetailFooter event={event} />
            </DialogContent>
        </Dialog>
    )
}

export default EventDetailsDialog
