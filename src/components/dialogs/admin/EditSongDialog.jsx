"use client"

import React, { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import EditSongForm from "@/components/forms/EditSongForm"

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
                        Edit Song
                    </DialogTitle>
                </DialogHeader>

                {/* New Modular Form */}
                <EditSongForm
                    song={song}
                    onSuccess={() => setOpen(false)}
                    onCancel={() => setOpen(false)}
                />
            </DialogContent>
        </Dialog>
    )
}

export default EditSongDialog