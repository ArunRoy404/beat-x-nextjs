import { Trash2 } from "lucide-react"
import CommonGlassPanel from "@/components/shared/CommonGlassPanel"
import { Button } from "@/components/ui/button"
import ProfileSectionHeader from "./ProfileSectionHeader"
import DeleteAccountDialog from "@/components/dialogs/user/profile/DeleteAccountDialog"

const ProfileDangerZoneSection = () => {
    return (
        <CommonGlassPanel className="flex flex-col gap-4 border-red-error/20 p-4 sm:gap-5 sm:p-5">
            <ProfileSectionHeader
                title="Danger Zone"
                description="Irreversible actions on your BeatX account."
            />

            <div className="flex flex-col gap-4 rounded-[12px] border border-red-error/20 bg-red-error/5 p-4 sm:flex-row sm:items-center">
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <span className="text-[14px] font-medium text-whitetext">Delete Account</span>
                    <span className="text-[12px] text-light-gray">
                        Permanently removes your account, library and purchase history.
                    </span>
                </div>

                <DeleteAccountDialog>
                    <Button
                        variant="destructive"
                        size="lg"
                        className="shrink-0 bg-red-error/15 text-red-error hover:bg-red-error/25"
                    >
                        <Trash2 className="size-4" />
                        Delete Account
                    </Button>
                </DeleteAccountDialog>
            </div>
        </CommonGlassPanel>
    )
}

export default ProfileDangerZoneSection
