"use client"

import React, { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import SongDetailContent from "@/components/admin/music/SongsDetails/SongDetailContent"
import SongUnderReviewDialogFooter from "@/components/admin/music/SongsDetails/SongUnderReviewDialogFooter"

const SongUnderReviewDialog = ({ song, children }) => {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className="sm:max-w-[672px] p-0 overflow-hidden flex flex-col max-h-[95vh]">
                {/* Screen reader only title for accessibility compliance */}
                <DialogTitle className="sr-only">
                    Song Details (Under Review) - {song?.title || "Unknown"}
                </DialogTitle>

                {/* Modular Song Details UI Content */}
                <SongDetailContent
                    song={song}
                />

                {/* Modular Footer containing Admin Note and Actions */}
                <SongUnderReviewDialogFooter
                    song={song}
                />
            </DialogContent>
        </Dialog>
    )
}

export default SongUnderReviewDialog
