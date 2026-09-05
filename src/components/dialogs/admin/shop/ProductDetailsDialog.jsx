"use client"

import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ProductDetailHeader from "@/components/admin/shop/ProductDetails/ProductDetailHeader"
import ProductDetailsTabs from "@/components/admin/shop/ProductDetails/ProductDetailsTabs"
import ProductDetailFooter from "@/components/admin/shop/ProductDetails/ProductDetailFooter"
import { useProductDetail } from "@/hooks/api/admin/products/useProductDetail"
import { useProductAnalytics } from "@/hooks/api/admin/products/useProductAnalytics"

const ProductDetailsDialog = ({ product, children }) => {
  const [open, setOpen] = useState(false)
  const productId = product?._id || product?.id

  const { data: detailResponse } = useProductDetail(open ? productId : null)
  const { data: analyticsResponse } = useProductAnalytics(open ? productId : null)

  const detailedProduct = detailResponse || product
  const analyticsData = analyticsResponse

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[672px] p-0 overflow-hidden flex flex-col max-h-[95vh]" showCloseButton={false}>
        {/* Screen reader only title for accessibility compliance */}
        <DialogTitle className="sr-only">
          Product Details - {detailedProduct?.title || "Unknown"}
        </DialogTitle>

        {/* Header */}
        <ProductDetailHeader product={detailedProduct} onClose={() => setOpen(false)} />

        {/* Product Details Tabs (containing Details and Analytics) */}
        <ProductDetailsTabs product={detailedProduct} analytics={analyticsData} />

        {/* Footer controls */}
        <ProductDetailFooter product={detailedProduct} onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}

export default ProductDetailsDialog

