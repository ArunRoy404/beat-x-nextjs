"use client"

import React, { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import AlbumTrackForm from "@/components/artist/albums/AlbumTrackForm"

const AddTrackDialog = ({ children, onSubmit }) => {
    const [open, setOpen] = useState(false)

    const handleSubmit = (data) => {
        onSubmit?.(data)
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Add Track
                    </DialogTitle>
                </DialogHeader>

                <div className="p-6 pt-0">
                    <AlbumTrackForm
                        submitLabel="Add"
                        onSubmit={handleSubmit}
                        onCancel={() => setOpen(false)}
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default AddTrackDialog
