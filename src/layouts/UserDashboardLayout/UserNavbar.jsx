"use client"

import { useState } from "react"
import { Bell, ChevronDown, Download, Gem } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import CommonSearch from "@/components/shared/CommonSearch/CommonSearch"
import CommonAvatar from "@/components/shared/CommonAvatar"
import { useUserProfileStore } from "@/zustandStore/user/userStore/userProfileStore"

const UserNavbar = () => {
    const [search, setSearch] = useState("")
    const profile = useUserProfileStore((state) => state.profile)

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

                <button
                    type="button"
                    className="relative flex size-11 shrink-0 items-center justify-center rounded-[8px] bg-dark-accent"
                >
                    <Bell className="size-6 text-whitetext" />
                    {profile.notificationCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-red-error text-[10px] text-whitetext font-switzer">
                            {profile.notificationCount}
                        </span>
                    )}
                </button>

                <button
                    type="button"
                    className="flex shrink-0 items-center gap-2 rounded-[8px] bg-dark-accent px-2 py-1"
                >
                    <CommonAvatar src={profile.avatar} alt={profile.name} className="size-9" />
                    <span className="hidden flex-col items-start sm:flex">
                        <span className="font-switzer text-xs text-whitetext">{profile.name}</span>
                        {profile.isPremium && (
                            <span className="flex items-center gap-1 text-xs text-secondary">
                                <Gem className="size-3" />
                                Premium
                            </span>
                        )}
                    </span>
                    <ChevronDown className="size-4 shrink-0 text-whitetext" />
                </button>
            </div>
        </div>
    )
}

export default UserNavbar
