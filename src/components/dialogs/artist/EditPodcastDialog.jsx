"use client"

import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ArtistEditPodcastForm from "@/components/forms/ArtistEditPodcastForm"

const EditPodcastDialog = ({ podcast, children }) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[620px] max-h-[90vh] overflow-y-auto scrollbar-thin">
        {/* Custom Header */}
        <DialogHeader>
          <DialogTitle>
            Edit Details
          </DialogTitle>
        </DialogHeader>

        {/* Edit Modular Form */}
        <ArtistEditPodcastForm
          podcast={podcast}
          onSuccess={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}

export default EditPodcastDialog
