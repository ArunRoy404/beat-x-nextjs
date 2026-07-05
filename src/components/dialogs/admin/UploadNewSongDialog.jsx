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
        <DialogHeader>
          <DialogTitle >
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
