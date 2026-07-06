"use client"

import React from "react"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"

const SongDetailFooter = () => {
    return (
        <div className="p-4 border-t border-white/5 mt-auto shrink-0 bg-card">
            <div className="flex items-center justify-between w-full">
                <Button
                    className="bg-red-error/10 hover:bg-red-error/20 border border-red-error/20 text-red-error font-medium rounded-[10px] px-4 h-10 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
                >
                    <Trash2 className="w-4 h-4" />
                    Delete
                </Button>

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

export default SongDetailFooter
