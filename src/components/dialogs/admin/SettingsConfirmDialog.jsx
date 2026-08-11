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
import { TriangleAlert } from "lucide-react"

const SettingsConfirmDialog = ({ title, description, confirmLabel = "Yes, Proceed", onConfirm, children }) => {
    const [open, setOpen] = useState(false)

    const handleConfirm = () => {
        onConfirm?.()
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-[12px] bg-red-error/10 border border-red-error/25 flex items-center justify-center text-red-error shrink-0">
                            <TriangleAlert className="w-5 h-5" />
                        </div>
                        <span className="text-[20px] font-semibold leading-none">{title}</span>
                    </DialogTitle>
                </DialogHeader>

                <div className="p-6 pt-0 flex flex-col gap-5">
                    {/* Alert description box */}
                    <div className="flex items-start gap-2 p-4 rounded-[16px] border-b border-red-error/10 bg-red-error/10">
                        <TriangleAlert className="w-4 h-4 text-red-error shrink-0 mt-0.5" />
                        <span className="text-whitetext text-[16px] not-italic font-normal">
                            {description}
                        </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            className="flex-1 rounded-full"
                            size="lg"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            className="flex-1 rounded-full bg-red-error hover:bg-red-error/90 text-white border-0"
                            size="lg"
                            onClick={handleConfirm}
                        >
                            {confirmLabel}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default SettingsConfirmDialog
