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
import InviteUserForm from "@/components/forms/InviteUserForm"

const InviteUserDialog = () => {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="gradient">
                    <PlusCircle /> Invite User
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[600px]">
                {/* Custom Header */}
                <DialogHeader>
                    <DialogTitle>Invite New User</DialogTitle>
                </DialogHeader>

                {/* Modular Form */}
                <InviteUserForm
                    onSuccess={() => setOpen(false)}
                    onCancel={() => setOpen(false)}
                />
            </DialogContent>
        </Dialog>
    )
}

export default InviteUserDialog
