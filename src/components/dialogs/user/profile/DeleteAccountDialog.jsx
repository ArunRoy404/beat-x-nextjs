"use client"

import React, { useState } from "react"
import { Trash2 } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import DeleteAccountForm from "@/components/forms/user/profile/DeleteAccountForm"

const DeleteAccountDialog = ({ children }) => {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>

            <DialogContent className="sm:max-w-[540px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-3">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-red-error/25 bg-red-error/10 text-red-error">
                            <Trash2 className="size-5" />
                        </span>
                        Delete Account
                    </DialogTitle>
                </DialogHeader>

                <DeleteAccountForm onCancel={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    )
}

export default DeleteAccountDialog
