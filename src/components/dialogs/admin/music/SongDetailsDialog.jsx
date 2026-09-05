"use client"

import React, { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Spinner } from "@/components/ui/spinner"
import { useSongDetail } from "@/hooks/api/admin/songs/useSongDetail"
import SongDetailHeader from "@/components/admin/music/SongsDetails/SongDetailHeader"
import SongDetailsTabs from "@/components/admin/music/SongsDetails/SongDetailsTabs"
import SongDetailFooter from "@/components/admin/music/SongsDetails/SongDetailFooter"

const SongDetailsDialog = ({ song: summary, children }) => {
    const [open, setOpen] = useState(false)
    const { data: detail, isLoading } = useSongDetail(open ? summary?._id : undefined)
    const song = detail || summary

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className="w-[95vw] max-w-[95vw] sm:max-w-[672px] p-0 overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[95vh] rounded-[16px] sm:rounded-[24px]">
                {/* Screen reader only title for accessibility compliance */}
                <DialogTitle className="sr-only">
                    Song Details - {song?.title || "Unknown"}
                </DialogTitle>

                {isLoading && !detail ? (
                    <div className="flex items-center justify-center py-24">
                        <Spinner className="size-6 text-secondary" />
                    </div>
                ) : (
                    <>
                        <SongDetailHeader song={song} />
                        <SongDetailsTabs song={song} />
                        <SongDetailFooter song={song} />
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default SongDetailsDialog
