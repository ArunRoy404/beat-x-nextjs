"use client"

import React from "react"
import { Monitor, Terminal, Globe } from "lucide-react"
import { cn } from "@/lib/utils"

export const getDeviceDetails = (device = "") => {
  const lower = String(device || "").toLowerCase()
  if (lower.includes("postman")) {
    return {
      label: "Postman API",
      IconComp: Terminal,
      badgeClass: "bg-yellow-warning/15 text-yellow-warning border-yellow-warning/30",
    }
  }
  if (lower.includes("axios")) {
    return {
      label: "Axios Client",
      IconComp: Terminal,
      badgeClass: "bg-secondary/15 text-secondary border-secondary/30",
    }
  }
  if (
    lower.includes("chrome") ||
    lower.includes("firefox") ||
    lower.includes("safari") ||
    lower.includes("mozilla")
  ) {
    return {
      label: "Web Browser",
      IconComp: Globe,
      badgeClass: "bg-green-success/15 text-green-success border-green-success/30",
    }
  }
  return {
    label: "System Service",
    IconComp: Monitor,
    badgeClass: "bg-dark-gray/20 text-light-gray border-border/40",
  }
}

const LoginDeviceBadge = ({ device, className }) => {
  const { label, IconComp, badgeClass } = getDeviceDetails(device)

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-none text-xs font-medium border shrink-0",
        badgeClass,
        className
      )}
    >
      <IconComp className="w-3.5 h-3.5" />
      {label}
    </span>
  )
}

export default LoginDeviceBadge
