"use client"

import React, { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Spinner } from "@/components/ui/spinner"
import { useAlbumDetail } from "@/hooks/api/admin/albums/useAlbumDetail"
import AlbumDetailHeader from "@/components/admin/albums/AlbumDetails/AlbumDetailHeader"
import AlbumDetailsTabs from "@/components/admin/albums/AlbumDetails/AlbumDetailsTabs"
import AlbumDetailFooter from "@/components/admin/albums/AlbumDetails/AlbumDetailFooter"

const AlbumDetailsDialog = ({ album: summary, children }) => {
    const [open, setOpen] = useState(false)
    const { data: detail, isLoading } = useAlbumDetail(open ? summary?._id : undefined)
    const album = detail ? { ...detail.album, songs: detail.songs } : summary

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className="sm:max-w-[672px] p-0 overflow-hidden flex flex-col max-h-[95vh]">
                {/* Screen reader only title for accessibility compliance */}
                <DialogTitle className="sr-only">
                    Album Details - {album?.title || "Unknown"}
                </DialogTitle>

                {isLoading && !detail ? (
                    <div className="flex items-center justify-center py-24">
                        <Spinner className="size-6 text-secondary" />
                    </div>
                ) : (
                    <>
                        {/* Common Header */}
                        <AlbumDetailHeader album={album} />

                        {/* Switchable Tabs between Details & Analytics */}
                        <AlbumDetailsTabs album={album} />

                        {/* Footer with Delete and Close buttons */}
                        <AlbumDetailFooter album={album} />
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default AlbumDetailsDialog
