import React from "react"
import { FileText, User, Check } from "lucide-react"
import { resolveMediaUrl } from "@/lib/format/resolveMediaUrl"

const KYCCard = ({ title, bg, icon: Icon, iconColor, url }) => {
  const imageUrl = url ? resolveMediaUrl(url) : ""

  return (
    <div className="flex flex-col rounded-[12px] border border-white/5 overflow-hidden bg-white/[0.01]">
      {/* Visual container */}
      <div
        className="flex h-[120px] flex-col justify-center items-center gap-2 border-b border-light-gray/20 relative overflow-hidden bg-cover bg-center"
        style={{ background: bg }}
      >
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10">
            <Icon className="w-5 h-5" style={{ color: iconColor }} />
          </div>
        )}
      </div>
      {/* Description details */}
      <div className="flex p-3 justify-between items-center w-full bg-transparent">
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="text-whitetext text-[14px] font-semibold font-sans truncate">{title}</span>
          <span className="text-light-gray text-[10px] font-normal font-sans">
            {imageUrl ? "Uploaded Document" : "Not Provided"}
          </span>
        </div>
        <span className={`inline-flex items-center gap-1 text-[9px] font-medium px-2 py-0.5 rounded-full border select-none ${
          imageUrl
            ? "bg-green-success/15 text-green-success border-green-success/20"
            : "bg-white/5 text-light-gray/50 border-white/10"
        }`}>
          <span className="w-1 h-1 rounded-full bg-current shrink-0" />
          {imageUrl ? "Uploaded" : "Pending"}
        </span>
      </div>
    </div>
  )
}

const ArtistDetailKYC = ({ artist }) => {
  const docType = artist?.identityDocs?.documentType?.toUpperCase() || "NATIONAL ID CARD"
  const frontSideUrl = artist?.identityDocs?.frontSideUrl || artist?.identityDocs?.frontSideKey
  const backSideUrl = artist?.identityDocs?.backSideUrl || artist?.identityDocs?.backSideKey
  const selfieUrl = artist?.identityDocs?.selfieUrl || artist?.identityDocs?.selfieKey
  const checklist = artist?.identityDocs?.checklist || {}

  const checklistItems = [
    { label: "Document Readable", checked: checklist.documentReadable ?? Boolean(frontSideUrl) },
    { label: "Name Matches Profile", checked: checklist.nameMatchesProfile ?? Boolean(frontSideUrl) },
    { label: "Document Not Expired", checked: checklist.documentNotExpired ?? Boolean(frontSideUrl) },
    { label: "Selfie Matches Document Photo", checked: checklist.selfieMatchesPhoto ?? Boolean(selfieUrl) },
  ]

  return (
    <div className="p-4 flex flex-col gap-5 overflow-y-auto flex-1 min-h-0 scrollbar-thin">
      {/* Title & Document type row */}
      <div className="flex items-center justify-between shrink-0">
        <div className="flex flex-col gap-1">
          <h3 className="text-whitetext text-[22px] font-semibold font-sans tracking-wide leading-none">
            Identity Verification
          </h3>
          <p className="text-[12px] font-normal text-light-gray font-sans mt-0.5">
            Document type: <strong className="font-semibold text-white/80">{docType}</strong>
          </p>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-full border bg-green-success/15 text-green-success border-green-success/20 select-none capitalize">
          <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
          {artist?.status || "Pending"}
        </span>
      </div>

      {/* 3 cards row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 shrink-0">
        <KYCCard
          title="Front of ID"
          bg="rgba(58, 223, 250, 0.10)"
          icon={FileText}
          iconColor="#3ADFFA"
          url={frontSideUrl}
        />
        <KYCCard
          title="Back of ID"
          bg="rgba(204, 151, 255, 0.10)"
          icon={FileText}
          iconColor="#CC97FF"
          url={backSideUrl}
        />
        <KYCCard
          title="Selfie with ID"
          bg="rgba(52, 199, 89, 0.10)"
          icon={User}
          iconColor="#34C759"
          url={selfieUrl}
        />
      </div>

      {/* Document Checklist Card */}
      <div className="flex p-4 flex-col gap-3 rounded-[12px] border border-white/5 bg-white/[0.01] shrink-0">
        <h4 className="text-whitetext text-[18px] font-semibold font-sans">
          Document Checklist
        </h4>
        <div className="flex flex-col gap-2">
          {checklistItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-[13px] text-light-gray font-normal">
              <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                item.checked
                  ? "bg-green-success/20 border border-green-success/30 text-green-success"
                  : "bg-white/5 border border-white/10 text-light-gray/40"
              }`}>
                <Check className="w-2.5 h-2.5 stroke-[3px]" />
              </div>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ArtistDetailKYC

