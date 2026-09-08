import { Pencil } from "lucide-react"
import CommonAvatar from "@/components/shared/CommonAvatar"
import CommonGlassPanel from "@/components/shared/CommonGlassPanel"
import { Button } from "@/components/ui/button"
import UserVerifiedBadge from "./UserVerifiedBadge"
import EditProfileDialog from "@/components/dialogs/user/profile/EditProfileDialog"

/**
 * Header card: who the signed-in listener is, plus the entry point to
 * PATCH /users/profile.
 */
const ProfileIdentityCard = ({ profile }) => {
    return (
        <CommonGlassPanel className="flex flex-col items-center gap-4 p-4 sm:flex-row sm:items-center sm:gap-5 sm:p-6">
            <CommonAvatar
                src={profile?.avatar || null}
                alt={profile?.name}
                className="size-16 shrink-0 sm:size-20"
            />

            <div className="flex min-w-0 flex-1 flex-col items-center gap-2 sm:items-start">
                <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                    <h1 className="text-[18px] font-semibold break-all text-whitetext sm:text-[22px]">
                        {profile?.name || "-"}
                    </h1>
                    {profile?.isVerified && <UserVerifiedBadge withLabel />}
                </div>

                <p className="text-[13px] break-all text-light-gray sm:text-[14px]">{profile?.email || "-"}</p>

                <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                    <span className="rounded-full bg-tag-chip-bg px-3 py-1 text-[12px] font-medium text-secondary uppercase">
                        {profile?.role || "-"}
                    </span>
                    <span className="rounded-full bg-tag-chip-bg px-3 py-1 text-[12px] font-medium text-light-gray uppercase">
                        {profile?.provider || "-"}
                    </span>
                </div>
            </div>

            <EditProfileDialog profile={profile}>
                <Button variant="outline" size="lg" className="w-full shrink-0 sm:w-auto">
                    <Pencil className="size-4" />
                    Edit Profile
                </Button>
            </EditProfileDialog>
        </CommonGlassPanel>
    )
}

export default ProfileIdentityCard
