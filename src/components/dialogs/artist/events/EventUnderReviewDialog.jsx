"use client"

import React, { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import EventDetailHeader from "@/components/artist/events/EventsDetails/EventDetailHeader"
import EventDetailContent from "@/components/artist/events/EventsDetails/EventDetailContent"
import EventUnderReviewDialogFooter from "@/components/artist/events/EventsDetails/EventUnderReviewDialogFooter"

const EventUnderReviewDialog = ({ event, startWithRejection = false, children }) => {
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
                    Event Details (Under Review) - {event?.title || "Unknown"}
                </DialogTitle>

                {/* Common Header */}
                <EventDetailHeader event={event} />

                {/* Modular Event Details UI Content */}
                <EventDetailContent
                    event={event}
                />

                {/* Modular Footer containing Admin Note and Actions */}
                <EventUnderReviewDialogFooter
                    event={event}
                    startWithRejection={startWithRejection}
                />
            </DialogContent>
        </Dialog>
    )
}

export default EventUnderReviewDialog
