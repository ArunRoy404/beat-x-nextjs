"use client"

import React, { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import AddGenreForm from "@/components/forms/AddGenreForm"

const AddGenreDialog = () => {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="gradient">
                    <PlusCircle /> Add Genre
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[540px]">
                {/* Custom Header */}
                <DialogHeader>
                    <DialogTitle>Add Genre</DialogTitle>
                </DialogHeader>

                {/* Modular Form */}
                <AddGenreForm
                    onSuccess={() => setOpen(false)}
                    onCancel={() => setOpen(false)}
                />
            </DialogContent>
        </Dialog>
    )
}

export default AddGenreDialog
