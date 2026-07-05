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
import UploadNewSongForm from "@/components/forms/UploadNewSongForm"

const UploadNewSongDialog = () => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="gradient">
          <PlusCircle /> Upload Song
        </Button>
      </DialogTrigger>

      <DialogContent>
        {/* Custom Header */}
        <DialogHeader className="bg-dark-accent p-6 flex flex-row items-center justify-between border-b border-whitetext/5 shrink-0">
          <DialogTitle className="text-[24px] not-italic font-medium text-whitetext font-sans leading-none">
            Upload New Song
          </DialogTitle>
        </DialogHeader>

        {/* New Modular Form */}
        <UploadNewSongForm
          onSuccess={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}

export default UploadNewSongDialog
