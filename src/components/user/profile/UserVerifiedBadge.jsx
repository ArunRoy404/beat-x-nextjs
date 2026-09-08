import { BadgeCheck } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Shown only when `/users/me` reports `isVerified: true`.
 */
const UserVerifiedBadge = ({ withLabel = false, className }) => {
    return (
        <span
            className={cn(
                "inline-flex items-center gap-1 text-secondary",
                withLabel && "rounded-full bg-secondary/10 px-2 py-0.5 text-[12px] font-medium",
                className
            )}
        >
            <BadgeCheck className="size-4 shrink-0" />
            {withLabel && "Verified"}
        </span>
    )
}

export default UserVerifiedBadge
