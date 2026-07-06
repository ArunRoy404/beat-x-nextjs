"use client"

import React, { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import SongDetailHeader from "@/components/admin/music/SongsDetails/SongDetailHeader"
import SongDetailsTabs from "@/components/admin/music/SongsDetails/SongDetailsTabs"
import SongDetailFooter from "@/components/admin/music/SongsDetails/SongDetailFooter"

const SongDetailsDialog = ({ song, children }) => {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className="sm:max-w-[672px] p-0 overflow-hidden flex flex-col max-h-[95vh]">
                {/* Screen reader only title for accessibility compliance */}
                <DialogTitle className="sr-only">
                    Song Details - {song?.title || "Unknown"}
                </DialogTitle>

                {/* Common Header */}
                <SongDetailHeader song={song} />

                {/* Switchable Tabs between Details & Analytics */}
                <SongDetailsTabs song={song} />

                {/* Footer with Delete and Close buttons */}
                <SongDetailFooter song={song} />
            </DialogContent>
        </Dialog>
    )
}

export default SongDetailsDialog
