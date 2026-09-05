"use client"

import React from "react"
import { format } from "date-fns"
import LoginDeviceBadge from "@/components/admin/profile/LoginDeviceBadge"

const LoginHistoryCardItem = ({ item, index }) => {
  const rawIp = item?.ip || "-"
  const displayIp = rawIp.startsWith("::ffff:") ? rawIp.replace("::ffff:", "") : rawIp
  const isLocal = displayIp === "::1"

  const deviceStr = item?.device || "Unknown Client"

  const isoAt = item?.at
  let formattedDate = "-"
  if (isoAt) {
    try {
      formattedDate = format(new Date(isoAt), "MMM d, yyyy • hh:mm:ss a")
    } catch {
      formattedDate = isoAt
    }
  }

  return (
    <div className="flex flex-col gap-2.5 p-4 rounded-none bg-dark-accent/80 border border-border/50 backdrop-blur-md">
      {/* Header: Index & IP */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-light-gray text-xs font-mono font-medium">#{index + 1}</span>
          <span className="text-whitetext text-xs font-mono font-medium bg-[#141414] px-2 py-0.5 rounded-none border border-border/50">
            {displayIp}
          </span>
          {isLocal && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-none bg-secondary/15 text-secondary font-mono">
              Localhost
            </span>
          )}
        </div>
        <LoginDeviceBadge device={deviceStr} />
      </div>

      {/* Device User-Agent */}
      <div className="text-light-gray text-xs font-mono break-all bg-black/20 p-2.5 rounded-none border border-border/30">
        {deviceStr}
      </div>

      {/* Timestamp */}
      <div className="flex items-center justify-between text-xs text-light-gray pt-1 border-t border-border/30">
        <span>Login Timestamp</span>
        <span className="text-whitetext font-medium">{formattedDate}</span>
      </div>
    </div>
  )
}

export default LoginHistoryCardItem
