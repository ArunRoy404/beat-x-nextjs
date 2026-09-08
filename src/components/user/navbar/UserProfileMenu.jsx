"use client"

import { useRouter } from "next/navigation"
import { Bell, Download, Gem, Library, UserRound } from "lucide-react"
import { toast } from "sonner"
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
    const router = useRouter()
    const { data: profile } = useMyProfile()
    const { mutate: logout, isPending: isLoggingOut } = useLogout()

    const handleLogout = () => {
        logout(undefined, {
            onSuccess: () => {
                toast.success("Logged out successfully")
                router.push("/login")
                // proxy.js may have cached an authenticated redirect for
                // /login from before logout — force a fresh check.
                router.refresh()
            },
            onError: () => {
                toast.error("Something went wrong while logging out")
            },
        })
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer rounded-[8px] outline-none focus-visible:ring-2 focus-visible:ring-secondary/60">
                <UserProfileMenuTrigger name={profile?.name} />
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                sideOffset={12}
                className="w-72 max-w-[calc(100vw-2rem)] rounded-[12px] border border-(--glass-panel-border) bg-dark-accent/95 p-2 backdrop-blur-md"
            >
                <UserProfileMenuHeader
                    name={profile?.name}
                    email={profile?.email}
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

                <UserProfileMenuLogoutItem onLogout={handleLogout} isLoggingOut={isLoggingOut} />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserProfileMenu
