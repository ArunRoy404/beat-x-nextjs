"use client"

import React, { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import EditAlbumForm from "@/components/forms/EditAlbumForm"

const EditAlbumDialog = ({ album, children }) => {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px]">
                {/* Custom Header */}
                <DialogHeader>
                    <DialogTitle>Edit Album Details</DialogTitle>
                </DialogHeader>

                {/* Modular Form */}
                <EditAlbumForm
                    album={album}
                    onSuccess={() => setOpen(false)}
                    onCancel={() => setOpen(false)}
                />
            </DialogContent>
        </Dialog>
    )
}

export default EditAlbumDialog
