"use client"

import React from "react"
import { CheckCircle2, Check } from "lucide-react"
import { format } from "date-fns"
import CommonInfoBox from "@/components/shared/CommonInfoBox/CommonInfoBox"
import { useReviewOverview } from "@/hooks/api/admin/artists/useReviewOverview"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

const ArtistDetailOverview = ({ artist }) => {
  const verificationId = artist?._id || artist?.id
  const fullName = artist?.personalInfo?.fullName || artist?.fullName || artist?.name || "-"
  const stageName = artist?.personalInfo?.stageName || artist?.name || "-"
  const dob = artist?.personalInfo?.dateOfBirth
    ? format(new Date(artist.personalInfo.dateOfBirth), "yyyy-MM-dd")
    : artist?.dob || "-"
  const gender = artist?.personalInfo?.gender || artist?.gender || "-"
  const nationality = artist?.personalInfo?.nationality || artist?.nationality || "-"
  const primaryLanguage = artist?.personalInfo?.primaryLanguage || artist?.primaryLanguage || "-"
  const docType = artist?.identityDocs?.documentType || "National ID Card"
  const shortBio = artist?.personalInfo?.shortBio || artist?.shortBio || "-"
  const reviewedBy = artist?.reviewedBy?.name
  const reviewedAt = artist?.reviewedAt ? format(new Date(artist.reviewedAt), "MMM d, yyyy") : null
  const isOverviewReviewed = artist?.overviewReviewed ?? Boolean(reviewedBy)

  const reviewOverviewMutation = useReviewOverview()

  const handleMarkReviewed = async () => {
    if (!verificationId) return
    try {
      await reviewOverviewMutation.mutateAsync({
        id: verificationId,
        reviewed: true,
      })
      toast.success("Overview tab marked as reviewed.")
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || "Failed to mark overview reviewed.")
    }
  }

  return (
    <div className="p-4 flex flex-col gap-5 overflow-y-auto flex-1 min-h-0 scrollbar-thin">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-semibold text-whitetext font-sans">
          General Details
        </span>
        <Button
          type="button"
          disabled={reviewOverviewMutation.isPending || isOverviewReviewed}
          onClick={handleMarkReviewed}
          variant="outline"
          className={`h-8 px-3 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
            isOverviewReviewed
              ? "bg-green-success/15 text-green-success border-green-success/20 cursor-default"
              : "bg-white/5 border-white/10 text-light-gray hover:bg-white/10 hover:text-white"
          }`}
        >
          {isOverviewReviewed ? (
            <span className="flex items-center gap-1">
              <Check className="w-3 h-3 stroke-[3px]" /> Overview Reviewed
            </span>
          ) : reviewOverviewMutation.isPending ? (
            "Updating..."
          ) : (
            "Mark Tab Reviewed"
          )}
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Read-only field cards reusing standard InfoBox */}
        <CommonInfoBox label="Full Legal Name" value={fullName} />
        <CommonInfoBox label="Stage Name" value={stageName} />
        <CommonInfoBox label="Date of Birth" value={dob} />
        <CommonInfoBox label="Gender" value={gender} />
        <CommonInfoBox label="Nationality" value={nationality} />
        <CommonInfoBox label="Primary Language" value={primaryLanguage} />
        <CommonInfoBox label="Artist Category" value="Singer" />
        <CommonInfoBox label="ID Document" value={docType} />

        {/* Short Bio (Full Width) */}
        <div className="col-span-2 border border-white/10 bg-white/5 rounded-[16px] p-3 px-4 flex flex-col gap-1.5 w-full">
          <span className="text-[12px] text-dark-gray font-normal not-italic uppercase tracking-wider">Short Bio</span>
          <span className="text-[14px] text-whitetext/90 leading-relaxed font-normal">
            {shortBio}
          </span>
        </div>
      </div>

      {/* Review Confirmation Badge */}
      {reviewedBy && (
        <div className="flex items-center gap-2 p-3.5 rounded-[16px] border border-green-success/20 bg-green-success/5 text-green-success text-[13px] shrink-0 font-medium">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>
            Reviewed by <strong className="font-semibold text-whitetext">{reviewedBy}</strong>
            {reviewedAt ? ` on ${reviewedAt}` : ""}
          </span>
        </div>
      )}
    </div>
  )
}

export default ArtistDetailOverview


