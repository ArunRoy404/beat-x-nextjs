"use client"

import React from "react"
import { CheckCircle2 } from "lucide-react"
import CommonInfoBox from "@/components/shared/CommonInfoBox/CommonInfoBox"

const ArtistDetailOverview = ({ artist }) => {
  return (
    /* Scrollable Body Content matching SongDetailContent layout */
    <div className="p-4 flex flex-col gap-5 overflow-y-auto flex-1 min-h-0 scrollbar-thin">
      <div className="grid grid-cols-2 gap-4">
        {/* Read-only field cards reusing standard InfoBox */}
        <CommonInfoBox label="Full Legal Name" value={artist?.fullName || "Tahsin Ahmed"} />
        <CommonInfoBox label="Stage Name" value={artist?.name || "TAHSIN"} />
        <CommonInfoBox label="Date of Birth" value={artist?.dob || "1995-03-15"} />
        <CommonInfoBox label="Gender" value={artist?.gender || "Male"} />
        <CommonInfoBox label="Nationality" value={artist?.nationality || "Bangladeshi"} />
        <CommonInfoBox label="Primary Language" value={artist?.primaryLanguage || "Bengali"} />
        <CommonInfoBox label="Artist Category" value="Singer" />
        <CommonInfoBox label="ID Document" value="National ID Card" />

        {/* Short Bio (Full Width) */}
        <div className="col-span-2 border border-white/10 bg-white/5 rounded-[16px] p-3 px-4 flex flex-col gap-1.5 w-full">
          <span className="text-[12px] text-dark-gray font-normal not-italic uppercase tracking-wider">Short Bio</span>
          <span className="text-[14px] text-whitetext/90 leading-relaxed font-normal">
            {artist?.shortBio || "Multi-award winning pop artist from Dhaka, Bangladesh."}
          </span>
        </div>

        {/* Full Biography (Full Width) */}
        <div className="col-span-2 border border-white/10 bg-white/5 rounded-[16px] p-3 px-4 flex flex-col gap-1.5 w-full">
          <span className="text-[12px] text-dark-gray font-normal not-italic uppercase tracking-wider">Full Biography</span>
          <span className="text-[14px] text-whitetext/90 leading-relaxed font-normal leading-[22px]">
            {artist?.biography ||
              "Tahsin Ahmed is one of Bangladesh's most celebrated contemporary pop artists. Raised in Dhaka, he began singing at age 12 and released his debut album 'Asha' in 2018 which went platinum. Known for his emotionally resonant lyrics blending modern pop with classical Bangla influences, he has collaborated with artists across South Asia."}
          </span>
        </div>
      </div>

      {/* Review Confirmation Badge */}
      <div className="flex items-center gap-2 p-3.5 rounded-[16px] border border-green-success/20 bg-green-success/5 text-green-success text-[13px] shrink-0 font-medium">
        <CheckCircle2 className="w-4 h-4 shrink-0" />
        <span>Reviewed by <strong className="font-semibold text-whitetext">Nadia Islam</strong> on 2023-03-18</span>
      </div>
    </div>
  )
}

export default ArtistDetailOverview
