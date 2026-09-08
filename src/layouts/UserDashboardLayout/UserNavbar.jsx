"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, Download } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import CommonSearch from "@/components/shared/CommonSearch/CommonSearch"
import UserProfileMenu from "@/components/user/navbar/UserProfileMenu"

const UserNavbar = () => {
    const [search, setSearch] = useState("")

    return (
        <div className="flex w-full shrink-0 items-center justify-between gap-4 p-6">
            <div className="flex flex-1 items-center gap-3">
                <SidebarTrigger className="size-10 shrink-0 rounded-[8px] bg-dark-accent text-whitetext" />
                <CommonSearch
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search anythings..."
                    className="w-full max-w-94 border-transparent bg-dark-accent p-2"
                />
            </div>

            <div className="flex shrink-0 items-center gap-3.75">
                <button
                    type="button"
                    className="hidden h-full items-center gap-2 rounded-[6px] bg-dark-accent px-4 py-2 text-sm text-whitetext md:flex"
                >
                    <Download className="size-6" />
                    Download App
                </button>

                <Link
                    href="/notifications"
                    className="relative flex size-11 shrink-0 items-center justify-center rounded-[8px] bg-dark-accent"
                >
                    <Bell className="size-6 text-whitetext" />
                    {/* Unread badge — no notification count on /users/me yet.
                        Restore once the notifications API is wired up.
                    <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-red-error text-[10px] text-whitetext font-switzer">
                        {profile?.notificationCount}
                    </span>
                    */}
                </Link>

                <UserProfileMenu />
            </div>
        </div>
    )
}

export default UserNavbar
