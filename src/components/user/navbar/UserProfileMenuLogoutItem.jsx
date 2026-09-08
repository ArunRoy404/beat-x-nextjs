import { LogOut } from "lucide-react"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Spinner } from "@/components/ui/spinner"

/**
 * Sign-out row. Kept separate from `UserProfileMenuItem` because it runs an
 * action with a pending state instead of navigating.
 */
const UserProfileMenuLogoutItem = ({ onLogout, isLoggingOut = false }) => {
    return (
        <DropdownMenuItem
            variant="destructive"
            onClick={onLogout}
            disabled={isLoggingOut}
            closeOnClick={false}
            className="gap-3 rounded-[8px] px-2 py-2.5 text-[13px]"
        >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-[8px] bg-red-error/10">
                {isLoggingOut ? <Spinner className="size-4" /> : <LogOut className="size-4" />}
            </span>
            {isLoggingOut ? "Logging out..." : "Logout"}
        </DropdownMenuItem>
    )
}

export default UserProfileMenuLogoutItem
