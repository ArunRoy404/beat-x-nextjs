import React from "react"
import { CheckCircle2 } from "lucide-react"

const InfoCard = ({ label, value }) => (
  <div className="flex flex-col gap-1.5 p-4 rounded-[12px] border border-white/5 bg-white/[0.01]">
    <span className="text-[12px] font-normal text-light-gray/60 font-sans tracking-wide">
      {label}
    </span>
    <span className="text-[15px] font-semibold text-whitetext font-sans leading-tight">
      {value || "-"}
    </span>
  </div>
)

const ArtistDetailOverview = ({ artist }) => {
  return (
    <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-5 max-h-[50vh]">
      {/* 2-column info grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 shrink-0">
        <InfoCard label="Full Legal Name" value={artist?.fullName || "Tahsin Ahmed"} />
        <InfoCard label="Stage Name" value={artist?.name || "TAHSIN"} />
        <InfoCard label="Date of Birth" value={artist?.dob || "1995-03-15"} />
        <InfoCard label="Gender" value={artist?.gender || "Male"} />
        <InfoCard label="Nationality" value={artist?.nationality || "Bangladeshi"} />
        <InfoCard label="Primary Language" value={artist?.primaryLanguage || "Bengali"} />
        <InfoCard label="Artist Category" value="Singer" />
        <InfoCard label="ID Document" value="National ID Card" />
      </div>

      {/* Full width Bio blocks */}
      <div className="flex flex-col gap-4 shrink-0">
        <InfoCard
          label="Short Bio"
          value={artist?.shortBio || "Multi-award winning pop artist from Dhaka, Bangladesh."}
        />
        <InfoCard
          label="Full Biography"
          value={
            artist?.biography ||
            "Tahsin Ahmed is one of Bangladesh's most celebrated contemporary pop artists. Raised in Dhaka, he began singing at age 12 and released his debut album 'Asha' in 2018 which went platinum. Known for his emotionally resonant lyrics blending modern pop with classical Bangla influences, he has collaborated with artists across South Asia."
          }
        />
      </div>

      {/* Nadia Islam review block */}
      <div className="flex items-center gap-2 p-3.5 rounded-[12px] border border-green-success/20 bg-green-success/5 text-green-success text-[13px] shrink-0 mt-2 font-medium">
        <CheckCircle2 className="w-4 h-4 shrink-0" />
        <span>Reviewed by <strong className="font-semibold text-whitetext">Nadia Islam</strong> on 2023-03-18</span>
      </div>
    </div>
  )
}

export default ArtistDetailOverview
