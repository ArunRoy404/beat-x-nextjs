import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

/**
 * One preference from GET /users/settings, saved through
 * PATCH /users/settings the moment it is toggled.
 */
const ProfileSettingRow = ({ label, description, value, onChange, isPending = false, className }) => {
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

            <Switch
                checked={Boolean(value)}
                onCheckedChange={(checked) => onChange?.(checked)}
                disabled={isPending}
                className="shrink-0"
            />
        </div>
    )
}

export default ProfileSettingRow
