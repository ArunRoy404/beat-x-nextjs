"use client"

import React, { useState } from "react"
import { ShieldCheck, AlertCircle, XCircle, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"
import CommonSelect from "@/components/shared/CommonInputs/CommonInput/CommonSelect"
import { useAdminDashboardShopStore } from "@/zustandStore/admin/adminStore/adminDashboardShopStore"
import DeleteProductDialog from "@/components/dialogs/admin/shop/DeleteProductDialog"
import { toast } from "sonner"

const rejectionReasons = [
  { value: "identity_unclear", label: "Identity Music unclear or unreadable" },
  { value: "copyright_issue", label: "Potential Copyright Infringement" },
  { value: "inappropriate", label: "Inappropriate content or style violation" }
]

const ProductDetailFooter = ({ product, onClose }) => {
  const updateProduct = useAdminDashboardShopStore((state) => state.updateProduct)
  const isUnderReview = product?.status === "Under review"

  // Moderation state variables
  const [isRejecting, setIsRejecting] = useState(false)
  const [adminNote, setAdminNote] = useState("")
  const [rejectionReason, setRejectionReason] = useState("identity_unclear")
  const [additionalNote, setAdditionalNote] = useState("")

  const handleApprove = () => {
    updateProduct({
      ...product,
      status: "Active",
      adminNote: adminNote || undefined
    })
    toast.success("Product approved successfully!")
    onClose?.()
  }

  const handleConfirmRejection = () => {
    const selectedReasonLabel = rejectionReasons.find(r => r.value === rejectionReason)?.label || rejectionReason
    updateProduct({
      ...product,
      status: "Rejected",
      rejection: {
        reason: selectedReasonLabel,
        note: additionalNote
      }
    })
    toast.error("Product rejected.")
    onClose?.()
  }

  // 1. Rejection Form Subview
  if (isUnderReview && isRejecting) {
    return (
      <div className="p-4 border-t border-white/5 mt-auto shrink-0 bg-[#141414] flex flex-col gap-4 w-full">
        <div className="flex items-center gap-2 text-red-error">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span className="text-[12px] font-semibold uppercase tracking-wider font-sans">Reject Application</span>
        </div>

        {/* Rejection Reason dropdown */}
        <div className="flex flex-col gap-2">
          <span className="text-[12px] text-dark-gray font-semibold uppercase tracking-wider font-sans">Rejection Reason</span>
          <CommonSelect
            value={rejectionReason}
            onChange={setRejectionReason}
            options={rejectionReasons}
          />
        </div>

        {/* Additional Note */}
        <div className="flex flex-col gap-2">
          <span className="text-[12px] text-dark-gray font-semibold uppercase tracking-wider font-sans">Additional note to artist</span>
          <CommonInput
            type="textarea"
            placeholder="Explain what the artist need to fix...."
            value={additionalNote}
            onChange={(e) => setAdditionalNote(e.target.value)}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 w-full">
          <Button
            onClick={handleConfirmRejection}
            className="bg-red-error hover:bg-red-error/90 text-whitetext font-semibold rounded-[10px] px-4 h-10 flex items-center gap-2 border-0 cursor-pointer transition-all active:scale-95"
          >
            <XCircle className="w-4 h-4 stroke-[2px]" />
            Confirm Rejection
          </Button>
          <Button
            onClick={() => setIsRejecting(false)}
            className="bg-white/5 hover:bg-white/10 border border-white/10 text-light-gray font-medium rounded-[10px] px-6 h-10 flex items-center justify-center cursor-pointer transition-all active:scale-95"
          >
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  // 2. Under Review moderation view
  if (isUnderReview) {
    return (
      <div className="p-4 border-t border-white/5 mt-auto shrink-0 bg-[#141414] flex flex-col gap-4 w-full">
        {/* Admin Note Section */}
        <div className="flex flex-col gap-2">
          <span className="text-[12px] text-dark-gray font-semibold uppercase tracking-wider font-sans">
            Admin Note <span className="text-dark-gray/50 font-normal">( Optional - Visible to Artist )</span>
          </span>
          <CommonInput
            type="textarea"
            placeholder="Add a note for the artist....."
            value={adminNote}
            onChange={(e) => setAdminNote(e.target.value)}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <Button
              onClick={handleApprove}
              className="bg-green-success hover:bg-green-success/90 text-black font-semibold rounded-[10px] px-4 h-10 flex items-center gap-2 border-0 cursor-pointer transition-all active:scale-95"
            >
              <ShieldCheck className="w-4 h-4 stroke-[2px]" />
              Approve Song
            </Button>
            <Button
              onClick={() => setIsRejecting(true)}
              className="bg-red-error/15 hover:bg-red-error/25 border border-red-error/25 text-red-error font-medium rounded-[10px] px-4 h-10 flex items-center justify-center cursor-pointer transition-all active:scale-95"
            >
              Reject
            </Button>
          </div>

          <DialogClose asChild>
            <Button
              variant="outline"
              className="bg-white/5 hover:bg-white/10 border border-white/10 text-light-gray font-medium rounded-[10px] px-6 h-10 flex items-center justify-center cursor-pointer transition-all active:scale-95"
            >
              Close
            </Button>
          </DialogClose>
        </div>
      </div>
    )
  }

  // 3. Regular view (Active / Draft / Rejected) with Delete action
  return (
    <div className="p-4 border-t border-white/5 mt-auto shrink-0 bg-[#141414] flex items-center justify-between w-full">
      <DeleteProductDialog product={product} onDeleted={onClose}>
        <Button
          className="bg-red-error/10 hover:bg-red-error/20 border border-red-error/20 text-red-error font-medium rounded-[10px] px-4 h-10 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 border-0"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </Button>
      </DeleteProductDialog>

      <DialogClose asChild>
        <Button
          variant="outline"
          className="bg-white/5 hover:bg-white/10 border border-white/10 text-light-gray font-medium rounded-[10px] px-6 h-10 flex items-center justify-center cursor-pointer transition-all active:scale-95"
        >
          Close
        </Button>
      </DialogClose>
    </div>
  )
}

export default ProductDetailFooter
