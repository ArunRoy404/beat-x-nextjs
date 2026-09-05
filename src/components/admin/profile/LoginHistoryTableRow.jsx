"use client"

import React from "react"
import { format } from "date-fns"
import LoginDeviceBadge from "@/components/admin/profile/LoginDeviceBadge"

const LoginHistoryTableRow = ({ item, index }) => {
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
    <tr className="transition-colors hover:bg-white/[0.02]">
      <td className="p-4 w-[60px] text-light-gray text-xs font-mono">
        {index + 1}
      </td>
      <td className="p-4 w-[220px]">
        <div className="flex items-center gap-2">
          <span className="text-whitetext text-xs font-mono font-medium bg-[#141414] px-2 py-0.5 rounded-none border border-border/50">
            {displayIp}
          </span>
          {isLocal && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-none bg-secondary/15 text-secondary font-mono">
              Localhost
            </span>
          )}
        </div>
      </td>
      <td className="p-4">
        <div className="flex items-center gap-3">
          <LoginDeviceBadge device={deviceStr} />
          <span className="text-light-gray text-xs font-mono truncate max-w-[320px]" title={deviceStr}>
            {deviceStr}
          </span>
        </div>
      </td>
      <td className="p-4 w-[260px] text-right">
        <span className="text-whitetext text-xs font-medium">
          {formattedDate}
        </span>
      </td>
    </tr>
  )
}

export default LoginHistoryTableRow
