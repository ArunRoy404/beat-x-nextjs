import Link from "next/link"
import CommonAvatar from "@/components/shared/CommonAvatar"
import UserVerifiedBadge from "@/components/user/profile/UserVerifiedBadge"

/**
 * Identity block at the top of the profile dropdown — doubles as the link
 * through to the full profile page.
 */
const UserProfileMenuHeader = ({ name, email, isVerified }) => {
    return (
        <Link
            href="/profile"
            className="flex items-center gap-3 rounded-[8px] px-2 py-2.5 transition-colors hover:bg-white/5"
        >
            <CommonAvatar src={null} alt={name} className="size-10 shrink-0" />

            <div className="flex min-w-0 flex-1 flex-col">
                <span className="flex items-center gap-1.5">
                    <span className="truncate text-[14px] font-medium text-whitetext">{name || "-"}</span>
                    {isVerified && <UserVerifiedBadge />}
                </span>
                <span className="truncate text-[12px] text-light-gray">{email || "-"}</span>
            </div>
        </Link>
    )
}

export default UserProfileMenuHeader
