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
import CreateAlbumForm from "@/components/forms/CreateAlbumForm"

const CreateAlbumDialog = () => {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="gradient" className="rounded-full cursor-pointer">
                    <PlusCircle className="w-4 h-4 shrink-0" /> Create Album
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px]">
                {/* Custom Header */}
                <DialogHeader>
                    <DialogTitle>Create New Album</DialogTitle>
                </DialogHeader>

                {/* Modular Form */}
                <CreateAlbumForm
                    onSuccess={() => setOpen(false)}
                    onCancel={() => setOpen(false)}
                />
            </DialogContent>
        </Dialog>
    )
}

export default CreateAlbumDialog
