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
import CreateAlbumForm from "@/components/forms/CreateAlbumForm"

const CreateAlbumDialog = () => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="gradient">
          <PlusCircle /> Create Album
        </Button>
      </DialogTrigger>

      <DialogContent>
        {/* Custom Header */}
        <DialogHeader>
          <DialogTitle>
            Create New Album
          </DialogTitle>
        </DialogHeader>

        {/* New Modular Form */}
        <CreateAlbumForm
          onSuccess={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}

export default CreateAlbumDialog
