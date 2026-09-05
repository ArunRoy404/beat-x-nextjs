import React from "react"
import Image from "next/image"
import { Edit3, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import EditProductDialog from "@/components/dialogs/admin/shop/EditProductDialog"
import { resolveMediaUrl } from "@/lib/format/resolveMediaUrl"

const ProductDetailHeader = ({ product, onClose }) => {
  const isActive = product?.status === "active" || product?.status === "Active"
  const coverUrl = product?.images?.[0]?.url || (typeof product?.images?.[0] === "string" ? product?.images?.[0] : null) || product?.image

  return (
    <div
      className="p-4 border-b border-white/5 flex items-start justify-between gap-4 shrink-0 relative w-full"
      style={{ background: "var(--modal-header-bg)" }}
    >
      <div className="flex items-start gap-4">
        {/* Cover Art */}
        <Image
          src={resolveMediaUrl(coverUrl || "/product-images/hoodie.png")}
          alt={product?.title || "Product Cover"}
          width={80}
          height={80}
          className="w-[80px] h-[80px] rounded-[16px] object-cover border border-white/10 shrink-0"
        />

        {/* Metadata */}
        <div className="flex flex-col justify-between min-h-[80px] pr-8">
          <div className="flex flex-col gap-1.5">
            {/* Title row */}
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-[18px] font-semibold text-whitetext not-italic leading-none">
                {product?.title || "Product Title"}
              </h2>
              {/* Status Badge */}
              <span
                className={`inline-flex items-center gap-1 text-[10px] font-medium px-2.5 py-0.5 rounded-full border select-none ${
                  product?.status === "active" || product?.status === "Active"
                    ? "bg-green-success/15 text-green-success border-green-success/20"
                    : product?.status === "rejected" || product?.status === "Rejected"
                    ? "bg-red-error/15 text-red-error border-red-error/20"
                    : product?.status === "draft" || product?.status === "Draft"
                    ? "bg-white/5 text-light-gray/60 border-white/10"
                    : "bg-yellow-warning/15 text-yellow-warning border-yellow-warning/20" // Under review
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                {product?.status || "Pending"}
              </span>
            </div>

            {/* Subtitle */}
            <p className="text-[13px] font-normal text-light-gray/80 leading-none capitalize">
              {product?.artistName || product?.ownerId?.name || "Various"} · {product?.category || "vinyl"}
            </p>
          </div>

          {/* Short Stats */}
          <div className="flex items-center gap-6 mt-3">
            <div className="flex flex-col gap-1">
              <span className="text-[16px] font-semibold text-whitetext leading-none">
                {product?.soldCount ?? product?.sold ?? 0}
              </span>
              <span className="text-[11px] font-medium text-dark-gray uppercase tracking-wider">
                Sold
              </span>
            </div>
            <div className="w-[1px] h-6 bg-white/10" />
            <div className="flex flex-col gap-1">
              <span className="text-[16px] font-semibold text-[#3ADFFA] leading-none">
                ৳{product?.price ?? 0}
              </span>
              <span className="text-[11px] font-medium text-dark-gray uppercase tracking-wider">
                Price
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2 shrink-0">
        {isActive && (
          <EditProductDialog product={product}>
            <Button
              variant="outline"
              onClick={onClose}
              className="border-secondary/20 bg-secondary/10 hover:bg-secondary/20 text-secondary gap-1 rounded-md h-8 text-[12px] px-3 font-semibold cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </Button>
          </EditProductDialog>
        )}
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-light-gray hover:text-white hover:bg-white/5 transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default ProductDetailHeader

