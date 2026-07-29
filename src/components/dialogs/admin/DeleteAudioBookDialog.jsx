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
import { Trash2 } from "lucide-react"
import { toast } from "sonner"
import { useAdminDashboardAudioBooksStore } from "@/zustandStore/admin/adminStore/adminDashboardAudioBooksStore"

const DeleteAudioBookDialog = ({ bookId, children }) => {
  const [open, setOpen] = useState(false)
  const deleteAudioBook = useAdminDashboardAudioBooksStore((state) => state.deleteAudioBook)

  const handleDelete = () => {
    deleteAudioBook(bookId)
    toast.success("Audiobook deleted successfully!")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[400px] p-6 text-center flex flex-col gap-4">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[12px] bg-red-error/10 border border-red-error/25 flex items-center justify-center text-red-error shrink-0">
              <Trash2 className="w-5 h-5" />
            </div>
            <span className="text-[20px] font-semibold leading-none">Confirm Deletion</span>
          </DialogTitle>
        </DialogHeader>
        <p className="text-light-gray text-sm text-left">
          Are you sure you want to permanently delete this audiobook? This action cannot be undone.
        </p>
        <div className="flex gap-4">
          <DialogClose asChild className="flex-1">
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button 
            className="flex-1 bg-red-error hover:bg-red-error/90 text-white border-0" 
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteAudioBookDialog
