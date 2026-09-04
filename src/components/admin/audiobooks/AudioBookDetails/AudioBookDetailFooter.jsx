"use client"

import React from "react"
import { Edit2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import EditAudioBookDialog from "@/components/dialogs/admin/audiobooks/EditAudioBookDialog"
import DeleteAudioBookDialog from "@/components/dialogs/admin/audiobooks/DeleteAudioBookDialog"

const AudioBookDetailFooter = ({ book }) => {
    return (
        <div className="p-4 border-t border-white/5 mt-auto shrink-0 bg-card">
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                    <EditAudioBookDialog book={book}>
                        <Button
                            variant="outline"
                            className="bg-white/5 hover:bg-white/10 border border-white/10 text-whitetext font-medium rounded-[10px] px-4 h-10 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
                        >
                            <Edit2 className="w-4 h-4" />
                            Edit Audiobook
                        </Button>
                    </EditAudioBookDialog>

                    <DeleteAudioBookDialog book={book}>
                        <Button
                            className="bg-red-error/10 hover:bg-red-error/20 border border-red-error/20 text-red-error font-medium rounded-[10px] px-4 h-10 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
                        >
                            <Trash2 className="w-4 h-4" />
                            Delete Audiobook
                        </Button>
                    </DeleteAudioBookDialog>
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

export default AudioBookDetailFooter
