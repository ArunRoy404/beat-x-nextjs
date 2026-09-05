"use client"

import React from "react"
import { Pencil, Trash2 } from "lucide-react"
import { resolveMediaUrl } from "@/lib/format/resolveMediaUrl"
import EditProductDialog from "@/components/dialogs/admin/shop/EditProductDialog"
import DeleteProductDialog from "@/components/dialogs/admin/shop/DeleteProductDialog"

const ProductCard = ({ product }) => {
  const stock = product?.stock ?? 0
  const soldCount = product?.soldCount ?? product?.sold ?? 0
  const price = product?.price ?? 0
  const title = product?.title || "Untitled Product"
  const category = product?.category || "General"
  const rawStatus = (product?.status || "active").toLowerCase()

  const imageUrl = product?.images?.[0]?.url || product?.image || ""
  const resolvedImage = imageUrl ? resolveMediaUrl(imageUrl) : ""

  const isLowStock = stock > 0 && stock <= 5

  const statusDisplayMap = {
    active: "Active",
    draft: "Draft",
    rejected: "Rejected",
    out_of_stock: "Out of Stock",
    under_review: "Under Review",
  }
  const displayStatus = statusDisplayMap[rawStatus] || rawStatus

  return (
    <div
      className="flex p-1 flex-col items-center gap-2 rounded-[8px] border border-[#20201F] bg-[#20201F]/30 backdrop-blur-[5px] w-full select-none h-full group"
    >
      {/* Image container */}
      <div className="relative flex h-[221px] p-1 flex-col items-end justify-between self-stretch rounded-[8px] border border-[#484847]/15 overflow-hidden w-full bg-white/[0.02]">
        {resolvedImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={resolvedImage}
            alt={title}
            className="w-full h-full object-cover rounded-[8px]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-light-gray/40 text-xs">
            No Image
          </div>
        )}

        {/* Badges Overlay */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none w-[calc(100%-1rem)]">
          {/* Low Stock / Tag (left overlay) */}
          {isLowStock ? (
            <span className="bg-red-error text-white font-bold text-[9px] uppercase px-1.5 py-0.5 rounded-[4px] shadow-md select-none">
              Low Stock
            </span>
          ) : (
            <div />
          )}

          {/* Coin Badge (right overlay) */}
          {Boolean(product?.coinReward) && (
            <div className="flex items-center gap-1 bg-[#FFAE00]/10 border border-[#FFAE00]/30 text-[#FFAE00] px-1.5 py-0.5 rounded-[4px] text-[10px] font-semibold font-sans">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFAE00]" />
              {product.coinReward} Coins
            </div>
          )}
        </div>

        {/* Quick Actions (Edit / Delete) Overlay */}
        <div className="absolute bottom-2 right-2 flex items-center gap-1.5 z-10 pointer-events-auto opacity-90 group-hover:opacity-100 transition-opacity">
          <div onClick={(e) => e.stopPropagation()}>
            <EditProductDialog product={product}>
              <button
                type="button"
                title="Edit Product"
                className="w-8 h-8 rounded-full border border-secondary/30 bg-[#0E0E0E]/80 backdrop-blur-md hover:bg-secondary/30 text-secondary flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-95"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
            </EditProductDialog>
          </div>

          <div onClick={(e) => e.stopPropagation()}>
            <DeleteProductDialog product={product}>
              <button
                type="button"
                title="Delete Product"
                className="w-8 h-8 rounded-full border border-red-error/30 bg-[#0E0E0E]/80 backdrop-blur-md hover:bg-red-error/30 text-red-error flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-95"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </DeleteProductDialog>
          </div>
        </div>
      </div>

      {/* Details Container */}
      <div className="flex p-1 px-1.5 flex-col gap-2 self-stretch w-full mt-auto">
        {/* Title and Status Badge Row */}
        <div className="flex items-center justify-between gap-2 w-full">
          <h3 className="text-white font-semibold font-sans text-[16px] truncate max-w-[70%]" title={title}>
            {title}
          </h3>
          <span
            className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border select-none capitalize ${
              rawStatus === "active"
                ? "bg-green-success/15 text-green-success border-green-success/20"
                : rawStatus === "rejected"
                ? "bg-red-error/15 text-red-error border-red-error/20"
                : rawStatus === "draft"
                ? "bg-white/5 text-light-gray/60 border-white/10"
                : "bg-yellow-warning/15 text-yellow-warning border-yellow-warning/20"
            }`}
          >
            {displayStatus}
          </span>
        </div>

        {/* Category / Artist */}
        <p className="text-[#ADAAAA] text-[12px] font-normal font-sans truncate w-full capitalize">
          {category} {product?.artistName ? `· ${product.artistName}` : ""}
        </p>

        {/* Price and Stock / Sold Stats Row */}
        <div className="flex items-center justify-between gap-2 w-full mt-1">
          {/* Price */}
          <span className="text-[#3ADFFA] text-[16px] font-semibold font-sans">
            ৳{price.toFixed(2)}
          </span>

          {/* Stock and Sold */}
          <div className="flex items-center gap-3 text-[12px] font-normal font-sans">
            <span className="text-[#ADAAAA]">
              Stock: <strong className="font-semibold text-white/80">{stock}</strong>
            </span>
            <span className="text-[#34C759]">
              Sold: <strong className="font-semibold text-[#34C759]">{soldCount}</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard

