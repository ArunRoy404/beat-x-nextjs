"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { Bell } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import CommonAvatar from "@/components/shared/CommonAvatar"
import { useNavigationDetailsStore } from "@/navigationStore/navigationDetailsStore"

const CommonDashboardNavbar = () => {
  const pathname = usePathname()
  const navigationDetails = useNavigationDetailsStore((state) => state.navigationDetails)

  const activeDetails = navigationDetails[pathname] || {
    title: "Music Management",
    subtitle: "Manage all platform music — upload, review, approve"
  }

  const pageTitle = activeDetails.title
  const pageSubtitle = activeDetails.subtitle

  return (
    <header
      className="w-full flex items-center justify-between px-3 py-6 transition-all duration-300 border-b border-border bg-cover bg-center"
      style={{
        backgroundImage: "url('/bg-images/navigation_bg.png')",
      }}
    >
      {/* Title & Navigation controls */}
      <div className="flex items-center gap-3">
        <SidebarTrigger
          className="w-10 h-10 rounded-[8px] flex items-center justify-center text-secondary hover:text-white hover:bg-opacity-80 active:scale-95 cursor-pointer transition-all shrink-0"
          style={{
            background: "rgba(30, 36, 87, 0.40)",
            backdropFilter: "blur(2.5px)",
          }}
        />
        <div className="flex flex-col gap-1">
          <h1 className="text-whitetext text-[24px] not-italic font-medium leading-none">
            {pageTitle}
          </h1>
          <p className="text-light-gray text-[14px] not-italic font-normal leading-tight">
            {pageSubtitle}
          </p>
        </div>
      </div>

      {/* User Actions Section */}
      <div className="flex items-center gap-4">
        {/* Notifications Icon Button */}
        <button
          className="relative flex items-center justify-center w-10 h-10 rounded-[8px] transition-all duration-200 hover:opacity-85 active:scale-95 cursor-pointer"
          style={{
            background: "rgba(30, 36, 87, 0.40)",
            backdropFilter: "blur(2.5px)",
          }}
        >
          <div className="relative">
            <Bell className="w-5 h-5 text-secondary" />
            <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-error text-[8px] font-bold text-white leading-none">
              3
            </span>
          </div>
        </button>

        {/* User Profile Avatar */}
        <CommonAvatar />
      </div>
    </header>
  )
}

export default CommonDashboardNavbar