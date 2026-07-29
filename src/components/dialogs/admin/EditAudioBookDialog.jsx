"use client"

import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { X } from "lucide-react"
import EditAudioBookForm from "@/components/forms/EditAudioBookForm"

const EditAudioBookDialog = ({ book, children }) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[650px] p-0 overflow-hidden flex flex-col bg-[#121212] border border-white/10 rounded-[24px]">
        {/* Header Title */}
        <div className="p-4 flex items-center justify-between border-b border-white/5 bg-[#181818]">
          <DialogTitle className="text-[18px] font-semibold text-white">
            Edit Audiobook
          </DialogTitle>
        </div>

        {/* Dialog Form Container */}
        <div className="p-6 overflow-y-auto max-h-[85vh]">
          <EditAudioBookForm
            book={book}
            onSuccess={() => setOpen(false)}
            onCancel={() => setOpen(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditAudioBookDialog
