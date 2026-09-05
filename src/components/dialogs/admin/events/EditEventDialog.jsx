"use client"

import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import EditEventForm from "@/components/forms/events/EditEventForm"
import { useEventDetail } from "@/hooks/api/admin/events/useEventDetail"

const EditEventDialog = ({ event, children }) => {
  const [open, setOpen] = useState(false)
  const eventId = event?._id || event?.id

  const { data: detailData } = useEventDetail(open ? eventId : null)
  const detailedEvent = detailData || event

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent>
        {/* Custom Header */}
        <DialogHeader>
          <DialogTitle>
            Edit Event
          </DialogTitle>
        </DialogHeader>

        {/* Edit Modular Form */}
        <EditEventForm
          event={detailedEvent}
          onSuccess={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}

export default EditEventDialog
