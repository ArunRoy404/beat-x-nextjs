"use client"

import React, { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import AudioBookDetailHeader from "@/components/admin/audiobooks/AudioBookDetails/AudioBookDetailHeader"
import AudioBookDetailsTabs from "@/components/admin/audiobooks/AudioBookDetails/AudioBookDetailsTabs"
import AudioBookDetailFooter from "@/components/admin/audiobooks/AudioBookDetails/AudioBookDetailFooter"

const AudioBookDetailsDialog = ({ book, children }) => {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className="sm:max-w-[672px] p-0 overflow-hidden flex flex-col max-h-[95vh]">
                {/* Screen reader only title for accessibility compliance */}
                <DialogTitle className="sr-only">
                    Audiobook Details - {book?.title || "Unknown"}
                </DialogTitle>

                {/* Common Header */}
                <AudioBookDetailHeader book={book} />

                {/* Switchable Tabs between Details, Chapters, and Analytics */}
                <AudioBookDetailsTabs book={book} />

                {/* Footer with Delete and Close buttons */}
                <AudioBookDetailFooter book={book} />
            </DialogContent>
        </Dialog>
    )
}

export default AudioBookDetailsDialog
