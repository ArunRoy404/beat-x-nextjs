"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Eye } from "lucide-react"
import CommonInfoBox from "@/components/shared/CommonInfoBox/CommonInfoBox"
import CommonImageViewer from "@/components/shared/CommonImageViewer/CommonImageViewer"

const FALLBACK_GALLERY = [
  "/product-images/rainbow_shirt.png",
  "/product-images/t-shirt.png",
  "/product-images/hoodie.png",
  "/product-images/bag.png"
]

const ProductDetailContent = ({ product }) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [initialImageIndex, setInitialImageIndex] = useState(0)

  const galleryImages = product?.images?.length
    ? product.images.filter(Boolean)
    : FALLBACK_GALLERY

  const handleOpenViewer = (index) => {
    setInitialImageIndex(index)
    setIsViewerOpen(true)
  }

  return (
    <div className="p-4 flex flex-col gap-5 overflow-y-auto flex-1 min-h-0 scrollbar-thin">
      {/* Product Images Section */}
      <div className="flex flex-col gap-2 w-full shrink-0">
        <span className="text-[12px] text-dark-gray font-normal not-italic uppercase tracking-wider font-sans flex items-center justify-between">
          <span>Product images</span>
          <span className="text-[10px] text-light-gray/40 font-normal lowercase">(click to view)</span>
        </span>
        <div className="grid grid-cols-4 gap-3 w-full">
          {galleryImages.map((imgUrl, index) => (
            <div
              key={index}
              onClick={() => handleOpenViewer(index)}
              className="group relative aspect-square sm:h-[120px] rounded-[8px] border border-[#484847]/15 overflow-hidden bg-white/[0.02] cursor-pointer"
            >
              <Image
                src={typeof imgUrl === "string" ? imgUrl : imgUrl?.url || "/product-images/hoodie.png"}
                alt={`Product thumbnail ${index + 1}`}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                  <Eye className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CommonImageViewer
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        images={galleryImages}
        initialIndex={initialImageIndex}
        title={product?.title || "Product Images"}
      />

      {/* Info Boxes Grid */}
      <div className="grid grid-cols-2 gap-4 shrink-0">
        <CommonInfoBox label="Category" value={product?.category || "vinyl"} />
        <CommonInfoBox label="Price" value={`${product?.currency === "$" ? "$" : "৳"}${product?.price ?? 2800}`} />
        <CommonInfoBox label="In Stock" value={product?.stock ?? 12} />
        <CommonInfoBox label="Units Sold" value={product?.sold ?? 43} />
        <CommonInfoBox label="Coin Reward" value={product?.coinBadge ? `${product.coinBadge}s` : "50 coins"} />
        <CommonInfoBox label="Artist" value={product?.artist || "Various"} />
      </div>

      {/* Color Variants Section */}
      {product?.colorVariants?.length > 0 && (
        <div className="border border-white/10 bg-white/5 rounded-[16px] p-3 px-4 flex flex-col gap-2 w-full shrink-0">
          <span className="text-[12px] text-dark-gray font-normal not-italic uppercase tracking-wider font-sans">
            Color Variants
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            {product.colorVariants.map((col, idx) => (
              <div key={idx} className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-2.5 py-1 text-[12px] text-whitetext">
                <span
                  className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0"
                  style={{ backgroundColor: col?.hex || "#000" }}
                />
                <span>{col?.name || "Variant"}</span>
                {col?.stock !== undefined && (
                  <span className="text-light-gray/60 text-[10px]">({col.stock})</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available Sizes Section */}
      {(product?.availableSizes?.length > 0 || product?.sizes?.length > 0) && (
        <div className="border border-white/10 bg-white/5 rounded-[16px] p-3 px-4 flex flex-col gap-2 w-full shrink-0">
          <span className="text-[12px] text-dark-gray font-normal not-italic uppercase tracking-wider font-sans">
            Available Sizes
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            {(product?.availableSizes || product?.sizes || []).map((size, idx) => (
              <span
                key={idx}
                className="flex items-center justify-center min-w-[36px] h-8 px-3 rounded-full border border-secondary/20 bg-secondary/10 text-[12px] font-semibold text-secondary"
              >
                {size}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Description Section */}
      <div className="border border-white/10 bg-white/5 rounded-[16px] p-3 px-4 flex flex-col gap-1.5 w-full shrink-0">
        <span className="text-[12px] text-dark-gray font-normal not-italic uppercase tracking-wider font-sans">
          Description
        </span>
        <span className="text-[13px] text-whitetext/90 leading-relaxed font-normal">
          {product?.description ||
            `${product?.title || "BeatX Vinyl Collection Vol.1"} — official merchandise by Various. Premium quality with ${product?.stock ?? 12} units currently in stock.`}
        </span>
      </div>
    </div>
  )
}

export default ProductDetailContent
