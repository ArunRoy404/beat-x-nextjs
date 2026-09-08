import CommonGlassPanel from "@/components/shared/CommonGlassPanel"

/**
 * One favourites bucket from `/users/me`. The endpoint returns bare id
 * arrays, so this shows the count plus an empty state rather than inventing
 * titles or artwork the API hasn't sent.
 */
const ProfileFavoritesGroup = ({ icon, title, items }) => {
    const count = items?.length ?? 0

    return (
        <CommonGlassPanel className="flex flex-col gap-3 p-4">
            <div className="flex items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-white/5 text-secondary">
                    {icon}
                </span>
                <span className="min-w-0 flex-1 truncate text-[14px] text-whitetext">{title}</span>
                <span className="text-[18px] font-semibold text-whitetext">{count}</span>
            </div>

            <p className="text-[12px] text-light-gray">
                {count > 0 ? `${count} saved` : "Nothing saved yet"}
            </p>
        </CommonGlassPanel>
    )
}

export default ProfileFavoritesGroup
