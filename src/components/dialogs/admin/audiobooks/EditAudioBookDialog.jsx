"use client"

import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Spinner } from "@/components/ui/spinner"
import { useAudioBookDetail } from "@/hooks/api/admin/audiobooks/useAudioBookDetail"
import EditAudioBookForm from "@/components/forms/audiobooks/EditAudioBookForm"

const EditAudioBookDialog = ({ book: summary, children }) => {
  const [open, setOpen] = useState(false)
  const { data: detail, isLoading } = useAudioBookDetail(open ? summary?._id : undefined)
  const book = detail?.audiobook || detail?.book || summary

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[620px] max-h-[90vh] overflow-y-auto scrollbar-thin">
        <DialogHeader>
          <DialogTitle>
            Edit Audiobook
          </DialogTitle>
        </DialogHeader>

        {isLoading && !detail ? (
          <div className="flex items-center justify-center py-12">
            <Spinner className="size-6 text-secondary" />
          </div>
        ) : (
          <EditAudioBookForm
            book={book}
            onSuccess={() => setOpen(false)}
            onCancel={() => setOpen(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

export default EditAudioBookDialog
