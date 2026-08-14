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
import { UserPlus } from "lucide-react"
import AddArtistForm from "@/components/forms/artists/AddArtistForm"

const AddArtistDialog = () => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="gradient">
          <UserPlus className="w-4 h-4 shrink-0 mr-1.5" /> Add Artist
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px]">
        {/* Custom Header */}
        <DialogHeader>
          <DialogTitle>
            Add Artist
          </DialogTitle>
        </DialogHeader>

        {/* Form Component */}
        <AddArtistForm
          onSuccess={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}

export default AddArtistDialog
