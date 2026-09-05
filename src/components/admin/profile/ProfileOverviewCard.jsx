"use client"

import React from "react"
import CommonCard from "@/components/shared/CommonCard/CommonCard"
import CommonAvatar from "@/components/shared/CommonAvatar"
import { format } from "date-fns"
import { ShieldCheck, CheckCircle2, XCircle, Key, Calendar, RefreshCw, User, Mail, Clock } from "lucide-react"

const ProfileOverviewCard = ({ profile }) => {
  const formatDateStr = (dateStr) => {
    if (!dateStr) return "-"
    try {
      return format(new Date(dateStr), "MMM d, yyyy • hh:mm a")
    } catch {
      return dateStr
    }
  }

  const isVerified = Boolean(profile?.isVerified)

  const infoList = [
    {
      label: "Account ID",
      value: profile?._id || "-",
      icon: Key,
      isMono: true,
    },
    {
      label: "System Role",
      value: profile?.role ? String(profile?.role).toUpperCase() : "-",
      icon: ShieldCheck,
      isBadge: true,
      badgeClass: "bg-secondary/15 text-secondary border-secondary/30",
    },
    {
      label: "Auth Provider",
      value: profile?.provider ? String(profile?.provider).toUpperCase() : "LOCAL",
      icon: User,
    },
    {
      label: "Verification Status",
      value: isVerified ? "Verified" : "Unverified",
      icon: isVerified ? CheckCircle2 : XCircle,
      isBadge: true,
      badgeClass: isVerified
        ? "bg-green-success/15 text-green-success border-green-success/30"
        : "bg-yellow-warning/15 text-yellow-warning border-yellow-warning/30",
    },
    {
      label: "Account Created",
      value: formatDateStr(profile?.createdAt),
      icon: Calendar,
    },
    {
      label: "Last Updated",
      value: formatDateStr(profile?.updatedAt),
      icon: RefreshCw,
    },
  ]

  return (
    <CommonCard
      title="Account Information"
      subtitle="System credentials, user ID, role, and verification details"
    >
      <div className="flex flex-col gap-6 relative z-10 pt-2">
        {/* User Identity Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-[8px] border border-border bg-[#141414]">
          <div className="flex items-center gap-4">
            <CommonAvatar
              src={profile?.avatar}
              alt={profile?.name || "Admin"}
              className="w-16 h-16 rounded-full border-2 border-secondary/30 ring-2 ring-secondary/10"
            />
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-whitetext text-lg font-semibold">{profile?.name || "Admin"}</span>
                {isVerified && (
                  <CheckCircle2 className="w-4 h-4 text-green-success" />
                )}
              </div>
              <div className="flex items-center gap-2 text-light-gray text-xs">
                <Mail className="w-3.5 h-3.5 text-secondary" />
                <span>{profile?.email || "-"}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-light-gray text-xs bg-dark-gray/20 px-3 py-1.5 rounded-[6px] border border-border/40">
            <Clock className="w-3.5 h-3.5 text-secondary" />
            <span>Last Active: {formatDateStr(profile?.lastActiveAt)}</span>
          </div>
        </div>

        {/* Metadata Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {infoList.map((item, idx) => {
            const IconComp = item.icon
            return (
              <div
                key={idx}
                className="bg-[#141414] border border-border/50 rounded-[8px] p-3.5 flex flex-col gap-2 transition-colors hover:border-secondary/30"
              >
                <div className="flex items-center gap-2 text-light-gray text-xs font-normal uppercase tracking-wider">
                  <IconComp className="w-3.5 h-3.5 text-secondary shrink-0" />
                  <span>{item.label}</span>
                </div>

                {item.isBadge ? (
                  <div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${item.badgeClass}`}>
                      {item.value}
                    </span>
                  </div>
                ) : (
                  <span
                    className={`text-whitetext text-sm font-semibold truncate ${
                      item.isMono ? "font-mono text-xs text-secondary bg-black/40 px-2 py-0.5 rounded border border-border/40" : ""
                    }`}
                    title={item.value}
                  >
                    {item.value}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </CommonCard>
  )
}

export default ProfileOverviewCard
