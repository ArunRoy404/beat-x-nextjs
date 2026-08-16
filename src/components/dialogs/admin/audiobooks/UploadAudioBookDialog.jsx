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
import AddAudioBookForm from "@/components/forms/audiobooks/AddAudioBookForm"

const UploadAudioBookDialog = ({ children }) => {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children || (
                    <Button variant="gradient">
                        <PlusCircle /> Add Audiobook
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent className="sm:max-w-[560px]">
                <DialogHeader>
                    <DialogTitle>Add Audiobook</DialogTitle>
                </DialogHeader>

                <AddAudioBookForm
                    onSuccess={() => setOpen(false)}
                    onCancel={() => setOpen(false)}
                />
            </DialogContent>
        </Dialog>
    )
}

export default UploadAudioBookDialog
