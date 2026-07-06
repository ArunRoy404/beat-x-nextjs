import React from "react"
import CommonAvatar from "@/components/shared/CommonAvatar"

const CommonSongCell = ({ title, duration, cover }) => {
  return (
    <div className="flex items-center gap-3">
      <CommonAvatar
        src={cover}
        className="w-10 h-10 rounded-[8px]"
        alt={title}
      />
      <div className="flex flex-col min-w-0">
        <span className="text-whitetext text-[14px] font-normal truncate">
          {title}
        </span>
        <span className="text-dark-gray text-[12px] font-normal mt-0.5">
          {duration}
        </span>
      </div>
    </div>
  )
}

export default CommonSongCell