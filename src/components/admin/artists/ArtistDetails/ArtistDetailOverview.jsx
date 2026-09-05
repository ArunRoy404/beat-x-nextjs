"use client"

import React from "react"
import { CheckCircle2 } from "lucide-react"
import { format } from "date-fns"
import CommonInfoBox from "@/components/shared/CommonInfoBox/CommonInfoBox"

const ArtistDetailOverview = ({ artist }) => {
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

  return (
    <div className="p-4 flex flex-col gap-5 overflow-y-auto flex-1 min-h-0 scrollbar-thin">
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

