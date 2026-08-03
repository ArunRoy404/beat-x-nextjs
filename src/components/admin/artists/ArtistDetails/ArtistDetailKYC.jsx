import React from "react"
import { FileText, User, Check } from "lucide-react"

const KYCCard = ({ title, bg, strokeColor, icon: Icon, iconColor }) => (
  <div className="flex flex-col rounded-[12px] border border-white/5 overflow-hidden bg-white/[0.01]">
    {/* Visual container */}
    <div
      className="flex h-[120px] flex-col justify-center items-center gap-2 border-b border-light-gray/20"
      style={{ background: bg }}
    >
      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10">
        <Icon className="w-5 h-5" style={{ color: iconColor }} />
      </div>
    </div>
    {/* Description details */}
    <div className="flex p-3 justify-between items-center w-full bg-transparent">
      <div className="flex flex-col gap-0.5">
        <span className="text-whitetext text-[14px] font-semibold font-sans">{title}</span>
        <span className="text-light-gray text-[10px] font-normal font-sans">Uploaded · JPG · 2.4 MB</span>
      </div>
      <span className="inline-flex items-center gap-1 text-[9px] font-medium px-2 py-0.5 rounded-full border bg-green-success/15 text-green-success border-green-success/20 select-none">
        <span className="w-1 h-1 rounded-full bg-current shrink-0" />
        Verified
      </span>
    </div>
  </div>
)

const ArtistDetailKYC = () => {
  return (
    <div className="p-4 flex flex-col gap-5 overflow-y-auto flex-1 min-h-0 scrollbar-thin">
      {/* Title & Document type row */}
      <div className="flex items-center justify-between shrink-0">
        <div className="flex flex-col gap-1">
          <h3 className="text-whitetext text-[22px] font-semibold font-sans tracking-wide leading-none">
            Identity Verification
          </h3>
          <p className="text-[12px] font-normal text-light-gray font-sans mt-0.5">
            Document type: <strong className="font-semibold text-white/80">National ID Card</strong>
          </p>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-full border bg-green-success/15 text-green-success border-green-success/20 select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
          Verified
        </span>
      </div>

      {/* 3 cards row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 shrink-0">
        <KYCCard
          title="Front of ID"
          bg="rgba(58, 223, 250, 0.10)"
          icon={FileText}
          iconColor="#3ADFFA"
        />
        <KYCCard
          title="Back of ID"
          bg="rgba(204, 151, 255, 0.10)"
          icon={FileText}
          iconColor="#CC97FF"
        />
        <KYCCard
          title="Selfie with ID"
          bg="rgba(52, 199, 89, 0.10)"
          icon={User}
          iconColor="#34C759"
        />
      </div>

      {/* Document Checklist Card */}
      <div className="flex p-4 flex-col gap-3 rounded-[12px] border border-white/5 bg-white/[0.01] shrink-0">
        <h4 className="text-whitetext text-[18px] font-semibold font-sans">
          Document Checklist
        </h4>
        <div className="flex flex-col gap-2">
          {[
            "All required images uploaded",
            "Document is clearly readable",
            "Name matches artist profile",
            "Document is not expired",
            "Selfie matches document photo",
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-[13px] text-light-gray font-normal">
              <div className="w-4 h-4 rounded-full bg-green-success/20 border border-green-success/30 flex items-center justify-center text-green-success shrink-0">
                <Check className="w-2.5 h-2.5 stroke-[3px]" />
              </div>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ArtistDetailKYC
