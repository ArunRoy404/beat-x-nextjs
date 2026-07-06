"use client"

import React, { useState } from "react"
import { ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"

const SongUnderReviewDialogFooter = ({ song }) => {
    const [adminNote, setAdminNote] = useState("")

    return (
        <div className="p-4 border-t border-white/5 mt-auto shrink-0 bg-card flex flex-col gap-4">
            {/* Admin Note Section */}
            <div className="flex flex-col gap-2">
                <span className="text-[12px] text-dark-gray font-semibold uppercase tracking-wider">
                    Admin Note <span className="text-dark-gray/50 font-normal">( Optional - Visible to Artist )</span>
                </span>
                <CommonInput
                    type="textarea"
                    placeholder="Add a note for the artist....."
                    value={adminNote}
                    onChange={(e) => setAdminNote(e.target.value)}
                    className="rounded-[16px]! min-h-[90px] text-xs bg-white/5 border-white/10"
                />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                    <Button
                        className="bg-green-success hover:bg-green-success/90 text-button-text font-semibold rounded-[10px] px-4 h-10 flex items-center gap-2 border-0 cursor-pointer transition-all active:scale-95"
                    >
                        <ShieldCheck className="w-4 h-4 stroke-[2px]" />
                        Approve Song
                    </Button>
                    <Button
                        className="bg-red-error/10 hover:bg-red-error/20 border border-red-error/20 text-red-error font-medium rounded-[10px] px-4 h-10 flex items-center justify-center cursor-pointer transition-all active:scale-95"
                    >
                        Reject
                    </Button>
                </div>

                <DialogClose asChild>
                    <Button
                        variant="outline"
                        className="bg-white/5 hover:bg-white/10 border border-white/10 text-light-gray font-medium rounded-[10px] px-6 h-10 flex items-center justify-center cursor-pointer transition-all active:scale-95"
                    >
                        Close
                    </Button>
                </DialogClose>
            </div>
        </div>
    )
}

export default SongUnderReviewDialogFooter