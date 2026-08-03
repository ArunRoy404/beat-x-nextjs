import React from "react"
import { FileText } from "lucide-react"

const MaterialRow = ({ title, detail, status }) => {
  const isUploaded = status === "Uploaded"
  const isNotProvided = status === "Not provided"

  return (
    <div
      className="flex items-center justify-between p-4 gap-2 rounded-[16px] border border-[#ADAAAA]/10 bg-[#20201F]/20 backdrop-blur-md w-full"
    >
      <div className="flex items-center gap-3">
        <div className="flex w-[26.25px] h-[26.25px] justify-center items-center shrink-0 bg-white/5 rounded-full text-light-gray">
          <FileText className="w-3.5 h-3.5" />
        </div>
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="text-whitetext text-[14px] font-semibold font-sans leading-none">{title}</span>
          <span className="text-[#ADAAAA] text-[11px] font-normal font-sans truncate">{detail}</span>
        </div>
      </div>

      <div className="shrink-0 select-none">
        {isUploaded ? (
          <span className="inline-flex items-center gap-1 text-[9px] font-medium px-2 py-0.5 rounded-full border bg-green-success/15 text-green-success border-green-success/20">
            Uploaded
          </span>
        ) : isNotProvided ? (
          <span className="inline-flex items-center gap-1 text-[9px] font-medium px-2 py-0.5 rounded-full border bg-white/5 text-light-gray/40 border-white/10">
            Not provided
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-[9px] font-medium px-2 py-0.5 rounded-full border bg-white/5 text-light-gray/40 border-white/10">
            Optional
          </span>
        )}
      </div>
    </div>
  )
}

const ArtistDetailMedia = ({ artist }) => {
  const initials = artist?.fullName
    ? artist.fullName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    : (artist?.name?.slice(0, 2).toUpperCase() || "TA")

  return (
    <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-6 max-h-[50vh]">
      {/* Profile Picture banner section */}
      <div className="flex flex-col gap-2 shrink-0">
        <h4 className="text-whitetext text-[14px] font-semibold font-sans tracking-wide">
          Profile Picture <span className="text-light-gray/50 font-normal">· min 1000×1000 px</span>
        </h4>
        <div className="flex items-center justify-center p-6 border-dashed border-2 border-[#ADAAAA]/15 bg-white/[0.01] rounded-[16px] w-full min-h-[140px]">
          <div className="flex flex-col items-center gap-2">
            <div
              className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center text-whitetext font-bold text-[24px]"
              style={{ background: "var(--modal-header-bg)" }}
            >
              {initials}
            </div>
            <span className="text-light-gray/50 text-[10px]">1080 × 1080 px</span>
          </div>
        </div>
      </div>

      {/* Additional Materials */}
      <div className="flex flex-col gap-3 shrink-0">
        <h3 className="text-whitetext text-[18px] font-semibold font-sans leading-none">
          Additional Materials
        </h3>
        <div className="flex flex-col gap-3">
          <MaterialRow title="Media Kit PDF" detail="1.8 MB" status="Uploaded" />
          <MaterialRow title="Press Release" detail="Not provided" status="Not provided" />
          <MaterialRow title="Promotional Materials" detail="Not provided" status="Optional" />
        </div>
      </div>
    </div>
  )
}

export default ArtistDetailMedia
