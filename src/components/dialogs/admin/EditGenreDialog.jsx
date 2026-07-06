"use client"

import React, { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import EditGenreForm from "@/components/forms/EditGenreForm"

const EditGenreDialog = ({ genre, children }) => {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className="sm:max-w-[540px]">
                {/* Custom Header */}
                <DialogHeader>
                    <DialogTitle>Edit Genre — {genre?.name}</DialogTitle>
                </DialogHeader>

                {/* Modular Form */}
                <EditGenreForm
                    genre={genre}
                    onSuccess={() => setOpen(false)}
                    onCancel={() => setOpen(false)}
                />
            </DialogContent>
        </Dialog>
    )
}

export default EditGenreDialog
