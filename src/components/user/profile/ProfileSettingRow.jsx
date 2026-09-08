import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

/**
 * One preference from `/users/me` → `settings`. Read-only: the collection
 * documents PATCH /users/settings, but it isn't wired into this screen yet,
 * so the control is presentational rather than faking a save.
 */
const ProfileSettingRow = ({ label, description, value, className }) => {
    const isToggle = typeof value === "boolean"

    return (
        <div
            className={cn(
                "flex items-center gap-3 border-b border-white/5 py-3 last:border-b-0 sm:gap-4",
                className
            )}
        >
            <div className="flex min-w-0 flex-1 flex-col">
                <span className="text-[13px] text-whitetext sm:text-[14px]">{label}</span>
                {description && <span className="text-[12px] text-light-gray">{description}</span>}
            </div>

            {isToggle ? (
                <Switch checked={value} disabled className="shrink-0" />
            ) : (
                <span className="shrink-0 text-[13px] font-medium text-light-gray uppercase">{value || "-"}</span>
            )}
        </div>
    )
}

export default ProfileSettingRow
