"use client"

import React, { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import PodcastDetailHeader from "@/components/artist/podcasts/PodcastsDetails/PodcastDetailHeader"
import PodcastDetailsTabs from "@/components/artist/podcasts/PodcastsDetails/PodcastDetailsTabs"
import PodcastDetailFooter from "@/components/artist/podcasts/PodcastsDetails/PodcastDetailFooter"

const PodcastDetailsDialog = ({ podcast, children }) => {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className="sm:max-w-[672px] p-0 overflow-hidden flex flex-col max-h-[95vh]">
                {/* Screen reader only title for accessibility compliance */}
                <DialogTitle className="sr-only">
                    Podcast Details - {podcast?.title || "Unknown"}
                </DialogTitle>

                {/* Common Header */}
                <PodcastDetailHeader podcast={podcast} />

                {/* Switchable Tabs between Details & Analytics */}
                <PodcastDetailsTabs podcast={podcast} />

                {/* Footer with Delete and Close buttons */}
                <PodcastDetailFooter podcast={podcast} />
            </DialogContent>
        </Dialog>
    )
}

export default PodcastDetailsDialog
