"use client"

import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ArtistEditEventForm from "@/components/forms/ArtistEditEventForm"

const EditEventDialog = ({ event, children }) => {
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
        <ArtistEditEventForm
          event={event}
          onSuccess={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}

export default EditEventDialog
