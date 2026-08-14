import React from "react"
import Link from "next/link"
import { LogOut, ChevronRight } from "lucide-react"
import { toast } from "sonner"
import CommonAvatar from "@/components/shared/CommonAvatar"
import { Spinner } from "@/components/ui/spinner"

const SidebarUserFooter = ({ name, role, avatar, href, onLogout, isLoggingOut = false }) => {
    const handleLogout = () => {
        if (onLogout) {
            onLogout()
            return
        }
        toast.success("Logged out")
    }

    const ProfileWrapper = href ? Link : "div"
    const profileWrapperProps = href ? { href } : {}

    return (
        <div className="flex flex-col gap-2 pt-3 mt-2 border-t border-white/5 shrink-0 transition-all duration-300">
            <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex items-center gap-[12px] px-[16px] py-[6px] h-8 rounded-[8px] text-red-error hover:bg-red-error/10 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group-data-[state=collapsed]:px-0 group-data-[state=collapsed]:justify-center group-data-[state=collapsed]:mx-auto group-data-[state=collapsed]:w-8"
            >
                {isLoggingOut ? (
                    <Spinner className="w-[18px] h-[18px] shrink-0" />
                ) : (
                    <LogOut className="w-[18px] h-[18px] shrink-0" />
                )}
                <span className="text-[14px] not-italic font-normal leading-normal transition-all duration-300 ease-in-out opacity-100 group-data-[state=collapsed]:opacity-0 group-data-[state=collapsed]:w-0 overflow-hidden whitespace-nowrap">
                    {isLoggingOut ? "Logging out..." : "Logout"}
                </span>
            </button>

            <ProfileWrapper
                {...profileWrapperProps}
                className="flex items-center gap-[12px] px-[16px] py-2 rounded-[8px] hover:bg-white/5 transition-colors duration-300 group-data-[state=collapsed]:px-0 group-data-[state=collapsed]:justify-center"
            >
                <CommonAvatar src={avatar} alt={name} className="w-9 h-9 shrink-0" />
                <div className="flex flex-col min-w-0 flex-1 transition-all duration-300 ease-in-out opacity-100 group-data-[state=collapsed]:opacity-0 group-data-[state=collapsed]:w-0 overflow-hidden whitespace-nowrap">
                    <span className="text-whitetext text-[14px] font-medium truncate leading-tight">{name}</span>
                    <span className="text-light-gray text-[12px] truncate leading-tight">{role}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-light-gray shrink-0 group-data-[state=collapsed]:hidden" />
            </ProfileWrapper>
        </div>
    )
}

export default SidebarUserFooter
