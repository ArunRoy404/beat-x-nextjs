"use client"

import Link from "next/link"
import { LogOut, ChevronRight } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import CommonAvatar from "@/components/shared/CommonAvatar"
import { Spinner } from "@/components/ui/spinner"

const NavbarUserMenu = ({ name, role, avatar, href, onLogout, isLoggingOut = false }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                openOnHover
                closeDelay={150}
                className="rounded-full outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-secondary/60"
            >
                <CommonAvatar src={avatar} alt={name} className="w-10 h-10 shrink-0" />
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                sideOffset={12}
                className="w-64 border border-border bg-dark-accent/95 backdrop-blur-md p-2"
            >
                <DropdownMenuItem render={<Link href={href} />} className="gap-3 px-2 py-2">
                    <CommonAvatar src={avatar} alt={name} className="w-9 h-9 shrink-0" />
                    <div className="flex flex-col min-w-0 flex-1">
                        <span className="text-whitetext text-[14px] font-medium truncate leading-tight">{name}</span>
                        <span className="text-light-gray text-[12px] truncate leading-tight">{role}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-light-gray shrink-0" />
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    variant="destructive"
                    onClick={onLogout}
                    disabled={isLoggingOut}
                    className="gap-3 px-2 py-2"
                >
                    {isLoggingOut ? (
                        <Spinner className="w-[16px] h-[16px]" />
                    ) : (
                        <LogOut className="w-[16px] h-[16px]" />
                    )}
                    {isLoggingOut ? "Logging out..." : "Logout"}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default NavbarUserMenu
