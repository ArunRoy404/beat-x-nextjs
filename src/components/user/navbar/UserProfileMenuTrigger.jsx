import { ChevronDown } from "lucide-react"
import CommonAvatar from "@/components/shared/CommonAvatar"

/**
 * The navbar button itself. Markup and styling are unchanged from the
 * original inline button so the navbar keeps its existing design.
 */
const UserProfileMenuTrigger = ({ name, avatar }) => {
    return (
        <span className="flex shrink-0 items-center gap-2 rounded-[8px] bg-dark-accent px-2 py-1">
            <CommonAvatar src={avatar} alt={name} className="size-9" />
            <span className="hidden flex-col items-start sm:flex">
                <span className="font-switzer text-xs text-whitetext">{name || "-"}</span>
                {/* Premium tier badge — /users/me exposes no subscription or plan
                    field yet. Restore this once the subscription API lands.
                <span className="flex items-center gap-1 text-xs text-secondary">
                    <Gem className="size-3" />
                    Premium
                </span>
                */}
            </span>
            <ChevronDown className="size-4 shrink-0 text-whitetext" />
        </span>
    )
}

export default UserProfileMenuTrigger
