import { KeyRound } from "lucide-react"
import CommonGlassPanel from "@/components/shared/CommonGlassPanel"
import { Button } from "@/components/ui/button"
import ProfileSectionHeader from "./ProfileSectionHeader"
import ChangePasswordDialog from "@/components/dialogs/user/profile/ChangePasswordDialog"

const ProfileChangePasswordCard = () => {
    return (
        <CommonGlassPanel className="flex flex-col gap-4 p-4 sm:gap-5 sm:p-5">
            <ProfileSectionHeader
                title="Password"
                description="Keep your BeatX account secure."
            />

            <div className="flex flex-col gap-4 rounded-[12px] border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center">
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <span className="text-[14px] font-medium text-whitetext">Change Password</span>
                    <span className="text-[12px] text-light-gray">
                        You&apos;ll need your current password to set a new one.
                    </span>
                </div>

                <ChangePasswordDialog>
                    <Button variant="outline" size="lg" className="shrink-0">
                        <KeyRound className="size-4" />
                        Change Password
                    </Button>
                </ChangePasswordDialog>
            </div>
        </CommonGlassPanel>
    )
}

export default ProfileChangePasswordCard
