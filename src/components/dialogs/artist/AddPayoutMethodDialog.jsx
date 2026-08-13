"use client"

import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import CardAction from "@/components/shared/CommonCard/CardAction"
import ArtistAddPayoutMethodForm from "@/components/forms/ArtistAddPayoutMethodForm"

const AddPayoutMethodDialog = () => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild nativeButton={false}>
        <CardAction>+ Add Method</CardAction>
      </DialogTrigger>

      <DialogContent>
        {/* Custom Header */}
        <DialogHeader>
          <DialogTitle>
            Add Payout Method
          </DialogTitle>
        </DialogHeader>

        {/* New Modular Form */}
        <ArtistAddPayoutMethodForm
          onSuccess={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}

export default AddPayoutMethodDialog
