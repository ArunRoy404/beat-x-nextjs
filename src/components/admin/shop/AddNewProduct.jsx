import React from "react"
import { PlusCircle, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

const AddNewProduct = () => {
  return (
    <div
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-[16px] border-dashed border-2 border-secondary/15 bg-secondary/[0.03] gap-4 w-full"
    >
      {/* Icon and details */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-[12px] bg-secondary/10 border border-secondary/25 flex items-center justify-center text-secondary shrink-0">
          <PlusCircle className="w-5 h-5" />
        </div>
        <div className="flex flex-col gap-1 min-w-0">
          <h2 className="text-whitetext text-[20px] not-italic font-medium leading-none truncate">
            Add New Product
          </h2>
          <p className="text-white/40 text-[12px] not-italic font-normal truncate mt-0.5">
            Manage merchandise and products
          </p>
        </div>
      </div>

      {/* Trigger Button - static as requested */}
      <Button variant="gradient" className="rounded-full px-5 h-10 flex items-center gap-1.5 font-semibold shrink-0 cursor-pointer">
        <Plus className="w-4 h-4 shrink-0" />
        <span>Add Product</span>
      </Button>
    </div>
  )
}

export default AddNewProduct
