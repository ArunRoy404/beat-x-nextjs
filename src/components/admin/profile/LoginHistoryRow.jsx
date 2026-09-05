"use client"

import React from "react"
import { Monitor, Terminal, Globe, Clock, ShieldAlert } from "lucide-react"

const LoginHistoryRow = ({ item, index }) => {
  const rawIp = item?.ip || "-"
  // Clean up IPv6 mapped IPv4 prefix if present (::ffff:103.133...)
  const displayIp = rawIp.startsWith("::ffff:") ? rawIp.replace("::ffff:", "") : rawIp
  const deviceStr = item?.device || "Unknown Device"
  const timestamp = item?.at
    ? new Date(item?.at).toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "medium",
      })
    : "-"

  // Determine device icon & badge based on user-agent / device string
  const getDeviceDetails = (device) => {
    const lower = String(device).toLowerCase()
    if (lower.includes("postman")) {
      return {
        label: "Postman API",
        icon: Terminal,
        badgeStyle: "bg-yellow-warning/15 text-yellow-warning border-yellow-warning/30",
      }
    }
    if (lower.includes("axios")) {
      return {
        label: "Axios Client",
        icon: Terminal,
        badgeStyle: "bg-secondary/15 text-secondary border-secondary/30",
      }
    }
    if (lower.includes("chrome") || lower.includes("firefox") || lower.includes("safari") || lower.includes("mozilla")) {
      return {
        label: "Web Browser",
        icon: Globe,
        badgeStyle: "bg-green-success/15 text-green-success border-green-success/30",
      }
    }
    return {
      label: "System Service",
      icon: Monitor,
      badgeStyle: "bg-light-gray/15 text-light-gray border-light-gray/30",
    }
  }

  const { label, icon: IconComp, badgeStyle } = getDeviceDetails(deviceStr)

  return (
    <tr className="border-b border-border/40 transition-colors hover:bg-white/[0.02]">
      {/* Index */}
      <td className="px-4 py-3 text-xs text-light-gray font-mono">{index + 1}</td>

      {/* IP Address */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-whitetext text-sm font-mono font-medium bg-black/40 px-2.5 py-1 rounded border border-border/40 inline-block">
            {displayIp}
          </span>
          {displayIp === "::1" && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary/10 text-secondary font-mono">
              Localhost
            </span>
          )}
        </div>
      </td>

      {/* Device & Client */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${badgeStyle}`}>
            <IconComp className="w-3.5 h-3.5" />
            {label}
          </span>
          <span className="text-light-gray text-xs font-mono max-w-[200px] truncate" title={deviceStr}>
            {deviceStr}
          </span>
        </div>
      </td>

      {/* Login Timestamp */}
      <td className="px-4 py-3 text-right">
        <div className="flex items-center justify-end gap-1.5 text-whitetext text-xs font-medium">
          <Clock className="w-3.5 h-3.5 text-secondary/70" />
          <span>{timestamp}</span>
        </div>
      </td>
    </tr>
  )
}

export default LoginHistoryRow
