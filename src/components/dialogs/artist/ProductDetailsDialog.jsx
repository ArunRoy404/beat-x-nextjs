"use client"

import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ProductDetailHeader from "@/components/artist/shop/ProductDetails/ProductDetailHeader"
import ProductDetailsTabs from "@/components/artist/shop/ProductDetails/ProductDetailsTabs"
import ProductDetailFooter from "@/components/artist/shop/ProductDetails/ProductDetailFooter"

const ProductDetailsDialog = ({ product, children }) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[672px] p-0 overflow-hidden flex flex-col max-h-[95vh]" showCloseButton={false}>
        {/* Screen reader only title for accessibility compliance */}
        <DialogTitle className="sr-only">
          Product Details - {product?.title || "Unknown"}
        </DialogTitle>

        {/* Header */}
        <ProductDetailHeader product={product} onClose={() => setOpen(false)} />

        {/* Product Details Tabs (containing Details and Analytics) */}
        <ProductDetailsTabs product={product} />

        {/* Footer controls */}
        <ProductDetailFooter product={product} onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}

export default ProductDetailsDialog
