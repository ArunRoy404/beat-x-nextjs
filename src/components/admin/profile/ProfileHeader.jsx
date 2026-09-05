"use client"

import React from "react"
import { cn } from "@/lib/utils"
import CommonAvatar from "@/components/shared/CommonAvatar"
import { ShieldCheck, CheckCircle2, XCircle, Coins, Clock, Mail, User } from "lucide-react"

const ProfileHeader = ({ profile }) => {
  const isVerified = Boolean(profile?.isVerified)
  const roleName = profile?.role ? String(profile?.role).toUpperCase() : "ADMIN"
  const coinBalance = profile?.coinBalance ?? 0
  const formattedLastActive = profile?.lastActiveAt
    ? new Date(profile?.lastActiveAt).toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "-"

  return (
    <div className="w-full bg-dark-accent/80 border border-border rounded-[16px] p-6 backdrop-blur-md relative overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
        {/* Left Side: Avatar & Details */}
        <div className="flex items-center gap-5">
          <div className="relative">
            <CommonAvatar
              src={profile?.avatar}
              alt={profile?.name || "Admin User"}
              className="w-20 h-20 rounded-full border-2 border-secondary/30 ring-4 ring-secondary/10 shadow-lg"
            />
            {isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-dark-accent rounded-full p-0.5" title="Verified Account">
                <CheckCircle2 className="w-5 h-5 text-green-success fill-green-success/20" />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center flex-wrap gap-2.5">
              <h1 className="text-whitetext text-2xl font-bold tracking-tight">
                {profile?.name || "Admin"}
              </h1>

              {/* Role Badge */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-secondary/15 text-secondary border border-secondary/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                {roleName}
              </span>

              {/* Verified Badge */}
              <span
                className={cn(
                  "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border",
                  isVerified
                    ? "bg-green-success/15 text-green-success border-green-success/30"
                    : "bg-yellow-warning/15 text-yellow-warning border-yellow-warning/30"
                )}
              >
                {isVerified ? (
                  <>
                    <CheckCircle2 className="w-3 h-3" /> Verified
                  </>
                ) : (
                  <>
                    <XCircle className="w-3 h-3" /> Unverified
                  </>
                )}
              </span>
            </div>

            <div className="flex items-center flex-wrap gap-4 text-light-gray text-sm">
              <div className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-secondary/70 shrink-0" />
                <span>{profile?.email || "-"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-secondary/70 shrink-0" />
                <span className="capitalize">Provider: {profile?.provider || "local"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Quick Stats Chips */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Coin Balance Chip */}
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-dark-gray/20 border border-border/60">
            <div className="w-9 h-9 rounded-lg bg-yellow-warning/15 flex items-center justify-center text-yellow-warning border border-yellow-warning/30">
              <Coins className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-light-gray font-medium">Coin Balance</span>
              <span className="text-whitetext text-base font-bold">{coinBalance?.toLocaleString()}</span>
            </div>
          </div>

          {/* Last Active Chip */}
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-dark-gray/20 border border-border/60">
            <div className="w-9 h-9 rounded-lg bg-secondary/15 flex items-center justify-center text-secondary border border-secondary/30">
              <Clock className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-light-gray font-medium">Last Active</span>
              <span className="text-whitetext text-xs font-semibold">{formattedLastActive}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader
