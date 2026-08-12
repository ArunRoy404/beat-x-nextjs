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
import { Plus } from "lucide-react"
import ArtistAddProductForm from "@/components/forms/ArtistAddProductForm"

const AddProductDialog = () => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="gradient" className="rounded-full px-5 h-10 flex items-center gap-1.5 font-semibold shrink-0 cursor-pointer">
          <Plus className="w-4 h-4 shrink-0" />
          <span>Add Product</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[620px] max-h-[90vh] overflow-y-auto scrollbar-thin">
        {/* Custom Header */}
        <DialogHeader>
          <DialogTitle>
            Add New Product
          </DialogTitle>
        </DialogHeader>

        {/* New Modular Form */}
        <ArtistAddProductForm
          onSuccess={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}

export default AddProductDialog
