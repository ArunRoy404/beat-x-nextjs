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
import ArtistRequestPayoutForm from "@/components/forms/payout/ArtistRequestPayoutForm"

const RequestPayoutDialog = () => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full bg-green-success hover:bg-green-success/90 text-white font-medium border-0 px-8 py-4 h-auto cursor-pointer">
          Request Payout
        </Button>
      </DialogTrigger>

      <DialogContent>
        {/* Custom Header */}
        <DialogHeader>
          <DialogTitle>
            Request Payout
          </DialogTitle>
        </DialogHeader>

        {/* New Modular Form */}
        <ArtistRequestPayoutForm
          onSuccess={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}

export default RequestPayoutDialog
