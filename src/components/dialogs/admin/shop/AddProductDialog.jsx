"use client"

import React from "react"
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { toast } from "sonner"
// import AddProductForm from "@/components/forms/shop/AddProductForm"

const AddProductDialog = ({ children }) => {
  // Preserving dialog and form code for future creator/admin merch creation integration
  // const [open, setOpen] = useState(false)

  const handleClick = (e) => {
    e?.stopPropagation?.()
    toast.info("This feature is currently unavailable.")
  }

  if (children && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: handleClick,
    })
  }

  return (
    <Button
      variant="gradient"
      onClick={handleClick}
      className="rounded-full px-5 h-10 flex items-center gap-1.5 font-semibold shrink-0 cursor-pointer"
    >
      <Plus className="w-4 h-4 shrink-0" />
      <span>Add Product</span>
    </Button>
  )

  /*
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="gradient" className="rounded-full px-5 h-10 flex items-center gap-1.5 font-semibold shrink-0 cursor-pointer">
            <Plus className="w-4 h-4 shrink-0" />
            <span>Add Product</span>
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[620px] max-h-[90vh] overflow-y-auto scrollbar-thin">
        <DialogHeader>
          <DialogTitle>
            Add New Product
          </DialogTitle>
        </DialogHeader>

        <AddProductForm
          onSuccess={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
  */
}

export default AddProductDialog

