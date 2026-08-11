"use client"

import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ArtistEditAlbumForm from "@/components/forms/ArtistEditAlbumForm"

const EditAlbumDialog = ({ album, children }) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent>
        {/* Custom Header */}
        <DialogHeader>
          <DialogTitle>
            Edit Details
          </DialogTitle>
        </DialogHeader>

        {/* Modular Form */}
        <ArtistEditAlbumForm
          album={album}
          onSuccess={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}

export default EditAlbumDialog
