"use client"

import React, { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Trash2 } from "lucide-react"
import DeleteSongForm from "@/components/forms/DeleteSongForm"

const DeleteSongDialog = ({ song, children }) => {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent>
                {/* Custom Header matching standard DialogHeader structure */}
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-[12px] bg-red-error/10 border border-red-error/25 flex items-center justify-center text-red-error shrink-0">
                            <Trash2 className="w-5 h-5" />
                        </div>
                        <span className="text-[20px] font-semibold leading-none">Confirm Deletion</span>
                    </DialogTitle>
                </DialogHeader>

                {/* Dialog Form Component */}
                <DeleteSongForm
                    song={song}
                    onSuccess={() => setOpen(false)}
                    onCancel={() => setOpen(false)}
                />
            </DialogContent>
        </Dialog>
    )
}

export default DeleteSongDialog
