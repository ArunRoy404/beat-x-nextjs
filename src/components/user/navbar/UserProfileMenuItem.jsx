import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

/**
 * One navigable row in the profile dropdown.
 */
const UserProfileMenuItem = ({ icon, title, href, className }) => {
    return (
        <DropdownMenuItem
            render={<Link href={href} />}
            className={cn(
                "group gap-3 rounded-[8px] px-2 py-2.5 text-[13px] text-light-gray transition-colors focus:bg-white/5 focus:text-whitetext",
                className
            )}
        >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-[8px] bg-white/5 text-secondary">
                {icon}
            </span>
            <span className="min-w-0 flex-1 truncate">{title}</span>
            <ChevronRight className="size-4 shrink-0 opacity-0 transition-opacity group-focus:opacity-100" />
        </DropdownMenuItem>
    )
}

export default UserProfileMenuItem
