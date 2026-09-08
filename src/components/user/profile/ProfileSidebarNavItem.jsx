import { cn } from "@/lib/utils"

/**
 * One entry in the profile page's section navigation.
 */
const ProfileSidebarNavItem = ({ icon, title, isActive, onClick }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "flex w-full cursor-pointer items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-left text-[13px] whitespace-nowrap transition-colors sm:gap-3 sm:text-[14px]",
                isActive
                    ? "bg-[var(--user-nav-active-bg)] text-whitetext"
                    : "text-light-gray hover:bg-white/5 hover:text-whitetext"
            )}
        >
            <span className={cn("shrink-0", isActive ? "text-secondary" : "text-light-gray")}>{icon}</span>
            <span className="flex-1">{title}</span>
        </button>
    )
}

export default ProfileSidebarNavItem
