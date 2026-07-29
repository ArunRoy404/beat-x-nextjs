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
import { DialogClose } from "@/components/ui/dialog"
import { toast } from "sonner"

const EditAudioBookDialog = ({ children }) => {
  const [open, setOpen] = useState(false)

  const handleSave = () => {
    toast.warning("This function is not implemented yet.")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[400px] p-6 text-center flex flex-col gap-4">
        <DialogHeader>
          <DialogTitle>Edit Audiobook</DialogTitle>
        </DialogHeader>
        <p className="text-light-gray text-sm">
          Audiobook metadata editing interface is under development.
        </p>
        <div className="flex gap-4">
          <DialogClose asChild className="flex-1">
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button className="flex-1" onClick={handleSave}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditAudioBookDialog
