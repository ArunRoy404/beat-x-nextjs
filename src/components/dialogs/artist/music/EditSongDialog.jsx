"use client"

import React, { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import ArtistEditSongForm from "@/components/forms/music/ArtistEditSongForm"

const EditSongDialog = ({ song, children }) => {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent>
                {/* Custom Header */}
                <DialogHeader>
                    <DialogTitle>
                        Edit Details
                    </DialogTitle>
                </DialogHeader>

                {/* New Modular Form */}
                <ArtistEditSongForm
                    song={song}
                    onSuccess={() => setOpen(false)}
                    onCancel={() => setOpen(false)}
                />
            </DialogContent>
        </Dialog>
    )
}

export default EditSongDialog
