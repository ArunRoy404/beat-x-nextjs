"use client"

import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ArtistEditProductForm from "@/components/forms/shop/ArtistEditProductForm"

const EditProductDialog = ({ product, children }) => {
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
            Edit Product
          </DialogTitle>
        </DialogHeader>

        {/* Edit Modular Form */}
        <ArtistEditProductForm
          product={product}
          onSuccess={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}

export default EditProductDialog
