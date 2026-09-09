"use client"

import { Bell, Download, Gem, Library, UserRound } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import UserProfileMenuTrigger from "./UserProfileMenuTrigger"
import UserProfileMenuHeader from "./UserProfileMenuHeader"
import UserProfileMenuCoinBalance from "./UserProfileMenuCoinBalance"
import UserProfileMenuItem from "./UserProfileMenuItem"
import UserProfileMenuLogoutItem from "./UserProfileMenuLogoutItem"
import { userProfileMenuNavigation } from "@/navigationData/userProfileMenuNavigation"
import { useMyProfile } from "@/hooks/api/user/profile/useMyProfile"
import { useLogout } from "@/hooks/api/auth/useLogout"

// Menu entries name their icon so the navigation list stays plain data.
const menuIcons = {
    UserRound: UserRound,
    Library: Library,
    Download: Download,
    Bell: Bell,
    Gem: Gem,
}

const UserProfileMenu = () => {
    const { data: profile } = useMyProfile()
    const { logout, isPending: isLoggingOut } = useLogout({ redirectTo: "/login" })

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer rounded-[8px] outline-none focus-visible:ring-2 focus-visible:ring-secondary/60">
                <UserProfileMenuTrigger
                    name={profile?.name}
                    avatar={profile?.avatar || profile?.image || profile?.profileImage}
                />
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                sideOffset={12}
                className="w-72 max-w-[calc(100vw-2rem)] rounded-[12px] border border-(--glass-panel-border) bg-dark-accent/95 p-2 backdrop-blur-md"
            >
                <UserProfileMenuHeader
                    name={profile?.name}
                    email={profile?.email}
                    avatar={profile?.avatar || profile?.image || profile?.profileImage}
                    isVerified={profile?.isVerified}
                />

                <UserProfileMenuCoinBalance coinBalance={profile?.coinBalance} />

                <DropdownMenuSeparator />

                {userProfileMenuNavigation?.map((item) => {
                    const Icon = menuIcons[item?.iconName]

                    return (
                        <UserProfileMenuItem
                            key={item?.url}
                            href={item?.url}
                            title={item?.title}
                            icon={Icon ? <Icon className="size-4" /> : null}
                        />
                    )
                })}

                <DropdownMenuSeparator />

                <UserProfileMenuLogoutItem onLogout={logout} isLoggingOut={isLoggingOut} />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserProfileMenu
