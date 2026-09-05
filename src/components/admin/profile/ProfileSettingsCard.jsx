"use client"

import React from "react"
import CommonCard from "@/components/shared/CommonCard/CommonCard"
import { Globe, Moon, Lock, MessageSquare, Mail, History, Activity, Wifi } from "lucide-react"

const ProfileSettingsCard = ({ settings }) => {
  const toggleItems = [
    {
      label: "System Language",
      value: settings?.language ? String(settings?.language).toUpperCase() : "EN",
      icon: Globe,
      type: "text",
    },
    {
      label: "Dashboard Theme",
      value: settings?.theme ? String(settings?.theme).toUpperCase() : "DARK",
      icon: Moon,
      type: "text",
    },
    {
      label: "Passcode Lock",
      enabled: Boolean(settings?.enablePasscode),
      icon: Lock,
      type: "boolean",
    },
    {
      label: "Email Notifications",
      enabled: Boolean(settings?.allowEmailNotification),
      icon: Mail,
      type: "boolean",
    },
    {
      label: "SMS Notifications",
      enabled: Boolean(settings?.allowSms),
      icon: MessageSquare,
      type: "boolean",
    },
    {
      label: "Search History Tracking",
      enabled: Boolean(settings?.trackSearchHistory),
      icon: History,
      type: "boolean",
    },
    {
      label: "Send Usage Diagnostics",
      enabled: Boolean(settings?.sendUsageData),
      icon: Activity,
      type: "boolean",
    },
    {
      label: "Wi-Fi Only Mode",
      enabled: Boolean(settings?.wifiOnlyMode),
      icon: Wifi,
      type: "boolean",
    },
  ]

  return (
    <CommonCard
      title="System Preferences & Security"
      subtitle="Profile preferences, notification settings, and security toggles"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10 pt-2">
        {toggleItems.map((item, idx) => {
          const IconComp = item.icon
          return (
            <div
              key={idx}
              className="bg-[#141414] border border-border/50 rounded-[8px] p-3.5 flex items-center justify-between gap-3 transition-colors hover:border-secondary/30"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-[6px] bg-secondary/10 flex items-center justify-center text-secondary shrink-0 border border-secondary/20">
                  <IconComp className="w-4 h-4" />
                </div>
                <span className="text-whitetext text-xs font-medium truncate">{item.label}</span>
              </div>

              {item.type === "boolean" ? (
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border shrink-0 uppercase tracking-wider ${
                    item.enabled
                      ? "bg-green-success/15 text-green-success border-green-success/30"
                      : "bg-dark-gray/20 text-light-gray border-border/40"
                  }`}
                >
                  {item.enabled ? "Enabled" : "Disabled"}
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-[4px] text-xs font-semibold bg-secondary/15 text-secondary border border-secondary/30 shrink-0">
                  {item.value}
                </span>
              )}
            </div>
          )
        })}
      </div>
    </CommonCard>
  )
}

export default ProfileSettingsCard
