"use client"

import React, { useState } from "react"
import { KeyRound } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import ChangePasswordForm from "@/components/forms/user/profile/ChangePasswordForm"

const ChangePasswordDialog = ({ children }) => {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>

            <DialogContent className="sm:max-w-[540px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-3">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-secondary/25 bg-secondary/10 text-secondary">
                            <KeyRound className="size-5" />
                        </span>
                        Change Password
                    </DialogTitle>
                </DialogHeader>

                <ChangePasswordForm
                    onSuccess={() => setOpen(false)}
                    onCancel={() => setOpen(false)}
                />
            </DialogContent>
        </Dialog>
    )
}

export default ChangePasswordDialog
