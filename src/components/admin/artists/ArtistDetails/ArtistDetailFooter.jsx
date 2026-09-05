"use client"

import React, { useState } from "react"
import { ShieldCheck, AlertCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"
import CommonSelect from "@/components/shared/CommonInputs/CommonInput/CommonSelect"
import { toast } from "sonner"
import { useApproveArtist } from "@/hooks/api/admin/artists/useApproveArtist"
import { useRejectArtist } from "@/hooks/api/admin/artists/useRejectArtist"
import { useRequestMoreInfoArtist } from "@/hooks/api/admin/artists/useRequestMoreInfoArtist"
import { useSuspendArtist } from "@/hooks/api/admin/artists/useSuspendArtist"
import { useReactivateArtist } from "@/hooks/api/admin/artists/useReactivateArtist"

const rejectionReasons = [
  { value: "document_unclear", label: "Identity document unclear or unreadable" },
  { value: "invalid_details", label: "Incomplete or fake profile information" },
  { value: "copyright_issue", label: "Potential Copyright Infringement" },
  { value: "tos_violation", label: "Terms of Service violation" }
]

const ArtistDetailFooter = ({ artist, onClose }) => {
  const verificationId = artist?._id || artist?.id

  // Footer state logic
  const statusKey = (artist?.status || "").toLowerCase()
  const isSuspended = statusKey === "suspended"
  const isVerified = statusKey === "approved" || statusKey === "verified"

  // Review states
  const [reviewMode, setReviewMode] = useState("main") // "main" | "request_info" | "reject"
  const [adminNote, setAdminNote] = useState("")
  const [customMessage, setCustomMessage] = useState("")
  const [rejectionReason, setRejectionReason] = useState("document_unclear")
  const [rejectionNote, setRejectionNote] = useState("")
  
  // Info Request Checkboxes
  const [infoChecklist, setInfoChecklist] = useState({
    documentPhotos: false,
    resolutionSelfie: false,
    socialLinks: false,
    incompleteBio: false,
    platformLinks: false,
  })

  // Mutation hooks
  const approveMutation = useApproveArtist()
  const rejectMutation = useRejectArtist()
  const requestInfoMutation = useRequestMoreInfoArtist()
  const suspendMutation = useSuspendArtist()
  const reactivateMutation = useReactivateArtist()

  const isPending =
    approveMutation.isPending ||
    rejectMutation.isPending ||
    requestInfoMutation.isPending ||
    suspendMutation.isPending ||
    reactivateMutation.isPending

  const toggleChecklist = (key) => {
    setInfoChecklist(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  // Action handlers
  const handleApprove = async () => {
    if (!verificationId) return
    try {
      await approveMutation.mutateAsync({ id: verificationId })
      toast.success("Artist application approved successfully!")
      onClose?.()
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || "Failed to approve artist.")
    }
  }

  const handleSendInfoRequest = async () => {
    if (!verificationId) return

    const items = []
    if (infoChecklist.documentPhotos) items.push("clearer_id_photos")
    if (infoChecklist.resolutionSelfie) items.push("higher_res_selfie")
    if (infoChecklist.socialLinks) items.push("missing_social_links")
    if (infoChecklist.incompleteBio) items.push("incomplete_bio")
    if (infoChecklist.platformLinks) items.push("platform_links_needed")

    if (items.length === 0 && !customMessage) {
      toast.error("Please select at least one checklist item or write a custom message.")
      return
    }

    try {
      await requestInfoMutation.mutateAsync({
        id: verificationId,
        items,
        message: customMessage || "Please provide the requested items.",
      })
      toast.info("Information request sent to artist.")
      onClose?.()
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || "Failed to request info.")
    }
  }

  const handleConfirmRejection = async () => {
    if (!verificationId) return
    try {
      await rejectMutation.mutateAsync({
        id: verificationId,
        reasonCode: rejectionReason,
        note: rejectionNote || "Please re-upload clearer verification documents.",
      })
      toast.error("Artist application rejected.")
      onClose?.()
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || "Failed to reject artist.")
    }
  }

  const handleToggleSuspend = async () => {
    if (!verificationId) return
    try {
      if (isSuspended) {
        await reactivateMutation.mutateAsync({ id: verificationId })
        toast.success("Artist reactivated successfully!")
      } else {
        await suspendMutation.mutateAsync({
          id: verificationId,
          reason: "Policy violation or administrative action.",
        })
        toast.warning("Artist suspended!")
      }
      onClose?.()
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || "Action failed.")
    }
  }

  // 1. Suspended View
  if (isSuspended) {
    return (
      <div className="p-4 border-t border-white/5 bg-[#1A1A19] flex items-center justify-between gap-4 shrink-0">
        <span className="text-red-error text-[12px] font-sans font-semibold tracking-wide uppercase">
          Status: Suspended Artist
        </span>
        <div className="flex items-center gap-3 shrink-0">
          <Button
            type="button"
            disabled={isPending}
            className="rounded-full bg-green-success hover:bg-green-success/90 text-white font-semibold px-4 h-9 cursor-pointer select-none border-0 disabled:opacity-50"
            onClick={handleToggleSuspend}
          >
            {reactivateMutation.isPending ? "Reactivating..." : "Reactivate Artist"}
          </Button>
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              className="rounded-full px-5 h-9 cursor-pointer hover:bg-white/5 transition-all text-whitetext border-white/10"
            >
              Close
            </Button>
          </DialogClose>
        </div>
      </div>
    )
  }

  // 2. Verified (Approved) View
  if (isVerified) {
    return (
      <div className="p-4 border-t border-white/5 bg-[#1A1A19] flex items-center justify-between gap-4 shrink-0">
        <span
          className="text-[#ADAAAA] font-normal leading-[15px] font-sans select-none"
          style={{ fontFamily: "Space Grotesk", fontSize: "11.25px" }}
        >
          {artist?.reviewedBy?.name ? `Verified by ${artist.reviewedBy.name}` : "Verified Artist"}
        </span>
        <div className="flex items-center gap-3 shrink-0">
          <Button
            type="button"
            disabled={isPending}
            className="rounded-full bg-red-error hover:bg-red-error/90 text-white font-semibold px-4 h-9 cursor-pointer select-none border-0 disabled:opacity-50"
            onClick={handleToggleSuspend}
          >
            {suspendMutation.isPending ? "Suspending..." : "Suspend Artist"}
          </Button>
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              className="rounded-full px-5 h-9 cursor-pointer hover:bg-white/5 transition-all text-whitetext border-white/10"
            >
              Close
            </Button>
          </DialogClose>
        </div>
      </div>
    )
  }

  // 3. Reviewable Subviews (Request Info & Reject)
  if (reviewMode === "request_info") {
    return (
      <div className="p-4 border-t border-white/5 mt-auto shrink-0 bg-card flex flex-col gap-4 w-full">
        {/* Header */}
        <div className="flex items-center gap-2 text-[#FFAE00]">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span className="text-[12px] font-semibold uppercase tracking-wider font-sans">Request Additional Information</span>
        </div>

        {/* Checkbox Checklist options */}
        <div className="flex flex-col gap-2">
          {[
            { key: "documentPhotos", label: "Clearer ID document photos" },
            { key: "resolutionSelfie", label: "Higher resolution selfie" },
            { key: "socialLinks", label: "Missing social profile links" },
            { key: "incompleteBio", label: "Incorrect or incomplete bio" },
            { key: "platformLinks", label: "Music platform links needed" },
          ].map((item) => (
            <label
              key={item.key}
              className="flex items-center gap-3 p-3 rounded-[12px] border border-white/5 bg-white/[0.01] hover:bg-white/5 cursor-pointer text-light-gray select-none"
            >
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-white/20 bg-transparent text-[#FFAE00] focus:ring-0 accent-[#FFAE00]"
                checked={infoChecklist[item.key]}
                onChange={() => toggleChecklist(item.key)}
              />
              <span className="text-[14px] font-normal font-sans">{item.label}</span>
            </label>
          ))}
        </div>

        {/* Custom Message input */}
        <div className="flex flex-col gap-2">
          <span className="text-[12px] text-dark-gray font-semibold uppercase tracking-wider font-sans">Custom message to artist</span>
          <CommonInput
            type="textarea"
            placeholder="Describe abjectly what needs to be updated..."
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button
            disabled={isPending}
            onClick={handleSendInfoRequest}
            className="bg-[#FFAE00] hover:bg-[#FFAE00]/90 text-black font-semibold rounded-[10px] px-4 h-10 flex items-center gap-2 border-0 cursor-pointer transition-all active:scale-95 disabled:opacity-50"
          >
            <AlertCircle className="w-4 h-4 stroke-[2px]" />
            {requestInfoMutation.isPending ? "Sending..." : "Send Info Request"}
          </Button>
          <Button
            onClick={() => setReviewMode("main")}
            className="bg-white/5 hover:bg-white/10 border border-white/10 text-light-gray font-medium rounded-[10px] px-6 h-10 flex items-center justify-center cursor-pointer transition-all active:scale-95"
          >
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  if (reviewMode === "reject") {
    return (
      <div className="p-4 border-t border-white/5 mt-auto shrink-0 bg-card flex flex-col gap-4 w-full">
        {/* Header */}
        <div className="flex items-center gap-2 text-red-error">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span className="text-[12px] font-semibold uppercase tracking-wider font-sans">Reject Application</span>
        </div>

        {/* Rejection Reason Dropdown */}
        <div className="flex flex-col gap-2">
          <span className="text-[12px] text-dark-gray font-semibold uppercase tracking-wider font-sans">Rejection Reason</span>
          <CommonSelect
            value={rejectionReason}
            onChange={setRejectionReason}
            options={rejectionReasons}
          />
        </div>

        {/* Additional Note to Artist */}
        <div className="flex flex-col gap-2">
          <span className="text-[12px] text-dark-gray font-semibold uppercase tracking-wider font-sans">Additional note to artist</span>
          <CommonInput
            type="textarea"
            placeholder="Explain what the artist needs to fix...."
            value={rejectionNote}
            onChange={(e) => setRejectionNote(e.target.value)}
          />
        </div>

        {/* Rejecting Actions */}
        <div className="flex items-center gap-3">
          <Button
            disabled={isPending}
            onClick={handleConfirmRejection}
            className="bg-red-error hover:bg-red-error/90 text-whitetext font-semibold rounded-[10px] px-4 h-10 flex items-center gap-2 border-0 cursor-pointer transition-all active:scale-95 disabled:opacity-50"
          >
            <XCircle className="w-4 h-4 stroke-[2px]" />
            {rejectMutation.isPending ? "Rejecting..." : "Confirm Rejection"}
          </Button>
          <Button
            onClick={() => setReviewMode("main")}
            className="bg-white/5 hover:bg-white/10 border border-white/10 text-light-gray font-medium rounded-[10px] px-6 h-10 flex items-center justify-center cursor-pointer transition-all active:scale-95"
          >
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  // 4. Main Review View (Pending/Under Review)
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
        <div className="flex items-center gap-3 flex-wrap">
          <Button
            disabled={isPending}
            onClick={handleApprove}
            className="bg-[#24C767] hover:bg-[#24C767]/90 text-black font-semibold rounded-[10px] px-4 h-10 flex items-center gap-2 border-0 cursor-pointer transition-all active:scale-95 disabled:opacity-50"
          >
            <ShieldCheck className="w-4 h-4 stroke-[2px]" />
            {approveMutation.isPending ? "Approving..." : "Approve Artist"}
          </Button>
          
          <Button
            onClick={() => setReviewMode("request_info")}
            className="bg-[#FFAE00]/10 hover:bg-[#FFAE00]/20 border border-[#FFAE00]/20 text-[#FFAE00] font-semibold rounded-[10px] px-4 h-10 flex items-center gap-2 cursor-pointer transition-all active:scale-95"
          >
            <AlertCircle className="w-4 h-4" />
            Request More Info
          </Button>

          <Button
            onClick={() => setReviewMode("reject")}
            className="bg-red-error/10 hover:bg-red-error/20 border border-red-error/20 text-red-error font-medium rounded-[10px] px-4 h-10 flex items-center justify-center cursor-pointer transition-all active:scale-95"
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

export default ArtistDetailFooter

