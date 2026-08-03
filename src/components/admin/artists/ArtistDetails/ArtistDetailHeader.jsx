import React from "react"
import { ShieldCheck, X } from "lucide-react"

const ArtistDetailHeader = ({ artist, onClose }) => {
  const initials = artist?.fullName
    ? artist.fullName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    : (artist?.name?.slice(0, 2).toUpperCase() || "TA")

  return (
    <div
      className="p-5 border-b border-white/5 flex items-start justify-between gap-4 shrink-0 relative"
      style={{ background: "var(--modal-header-bg)" }}
    >
      <div className="flex items-start gap-4">
        {/* Profile Initials/Avatar Container */}
        <div
          className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-whitetext font-bold text-[20px] shrink-0"
          style={{ background: "rgba(58, 223, 250, 0.15)" }}
        >
          {initials}
        </div>

        {/* Metadata */}
        <div className="flex flex-col gap-1.5 min-w-0 pr-8">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-[20px] font-semibold text-whitetext not-italic leading-none">
              {artist?.name || "Unknown Artist"}
            </h2>
            {artist?.status === "Verified" && (
              <div className="w-4 h-4 rounded-full bg-[#FFAE00] flex items-center justify-center text-[#0E0E0E] shrink-0">
                <ShieldCheck className="w-2.5 h-2.5 stroke-[3px]" />
              </div>
            )}
            {/* Status Badge */}
            <span
              className={`inline-flex items-center gap-1 text-[10px] font-medium px-2.5 py-0.5 rounded-full border select-none ${
                artist?.status === "Verified"
                  ? "bg-green-success/15 text-green-success border-green-success/20"
                  : artist?.status === "Suspended"
                  ? "bg-red-error/15 text-red-error border-red-error/20"
                  : "bg-yellow-warning/15 text-yellow-warning border-yellow-warning/20"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
              {artist?.status || "Pending"}
            </span>
          </div>

          <p className="text-[13px] font-normal text-light-gray/80 leading-none">
            {artist?.fullName || artist?.name || "Tahsin Ahmed"} · {artist?.nationality || "Bangladeshi"} · Singer
          </p>

          <p className="text-[12px] font-normal text-light-gray/60 leading-none mt-0.5">
            {artist?.email || "tahsin@beatx.io"} · +880-1711-234567
          </p>

          {/* Genre tags */}
          <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
            <span className="text-[10px] uppercase border border-white/10 bg-white/5 text-light-gray/80 px-2 py-0.5 rounded-full select-none font-medium">
              {artist?.genre || "POP"}
            </span>
            <span className="text-[10px] uppercase border border-white/10 bg-white/5 text-light-gray/80 px-2 py-0.5 rounded-full select-none font-medium">
              R&B
            </span>
            <span className="text-[10px] uppercase border border-white/10 bg-white/5 text-light-gray/80 px-2 py-0.5 rounded-full select-none font-medium">
              Soul
            </span>
          </div>
        </div>
      </div>

      {/* Close button and dates */}
      <div className="flex flex-col items-end justify-between min-h-[80px] text-right shrink-0">
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-light-gray hover:text-white hover:bg-white/5 transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="flex flex-col gap-1 text-[11px] text-light-gray/50 mt-auto">
          <span>Joined <strong>{artist?.joined || "2023-03-10"}</strong></span>
          <span>Applied <strong>{artist?.applied || "2023-03-12"}</strong></span>
        </div>
      </div>
    </div>
  )
}

export default ArtistDetailHeader
