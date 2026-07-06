"use client"

import React, { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import AlbumDetailHeader from "@/components/admin/albums/AlbumDetails/AlbumDetailHeader"
import AlbumDetailsTabs from "@/components/admin/albums/AlbumDetails/AlbumDetailsTabs"
import AlbumDetailFooter from "@/components/admin/albums/AlbumDetails/AlbumDetailFooter"
import { useAdminDashboardAlbumsStore } from "@/zustandStore/admin/adminStore/adminDashboardAlbumsStore"

const AlbumDetailsDialog = ({ album: initialAlbum, children }) => {
    const [open, setOpen] = useState(false)

    // Bind to store to get reactive updates
    const album = useAdminDashboardAlbumsStore((state) =>
        state.albumsList.find((a) => a.id === initialAlbum?.id)
    )

    if (!album) return null

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className="sm:max-w-[672px] p-0 overflow-hidden flex flex-col max-h-[95vh]">
                {/* Screen reader only title for accessibility compliance */}
                <DialogTitle className="sr-only">
                    Album Details - {album?.name || "Unknown"}
                </DialogTitle>

                {/* Modular Header */}
                <AlbumDetailHeader album={album} />

                {/* Switchable Tabs between Details & Analytics */}
                <AlbumDetailsTabs album={album} />

                {/* Footer with actions */}
                <AlbumDetailFooter album={album} onClose={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    )
}

export default AlbumDetailsDialog
