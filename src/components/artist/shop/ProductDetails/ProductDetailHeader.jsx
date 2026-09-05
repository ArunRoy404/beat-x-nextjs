import React from "react"
import Image from "next/image"
import { X } from "lucide-react"
import ProductStatusBadge from "@/components/shared/ProductStatusBadge/ProductStatusBadge"

const ProductDetailHeader = ({ product, onClose }) => {
  const isActive = product?.status === "Active"

  return (
    <div
      className="p-4 border-b border-white/5 flex items-start justify-between gap-4 shrink-0 relative w-full"
      style={{ background: "var(--modal-header-bg)" }}
    >
      <div className="flex items-start gap-4">
        {/* Cover Art */}
        <Image
          src={product?.image || "/product-images/hoodie.png"}
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
              <ProductStatusBadge status={product?.status} showDot className="px-2.5 font-medium" />
            </div>

            {/* Subtitle */}
            <p className="text-[13px] font-normal text-light-gray/80 leading-none">
              {product?.artist || "Various"} · {product?.category || "vinyl"}
            </p>
          </div>

          {/* Short Stats */}
          <div className="flex items-center gap-6 mt-3">
            <div className="flex flex-col gap-1">
              <span className="text-[16px] font-semibold text-whitetext leading-none">
                {product?.sold ?? 43}
              </span>
              <span className="text-[11px] font-medium text-dark-gray uppercase tracking-wider">
                Plays
              </span>
            </div>
            <div className="w-[1px] h-6 bg-white/10" />
            <div className="flex flex-col gap-1">
              <span className="text-[16px] font-semibold text-[#3ADFFA] leading-none">
                {product?.currency === "$" ? "$" : "৳"}{product?.price ?? 2800}
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
