import CommonGlassPanel from "@/components/shared/CommonGlassPanel"
import CommonInfoBox from "@/components/shared/CommonInfoBox/CommonInfoBox"
import ProfileSectionHeader from "./ProfileSectionHeader"
import { formatDateTime } from "@/lib/format/formatDate"

const ProfileOverviewSection = ({ profile }) => {
    return (
        <CommonGlassPanel className="flex flex-col gap-4 p-4 sm:gap-5 sm:p-5">
            <ProfileSectionHeader
                title="Account Overview"
                description="Details BeatX holds for your account."
            />

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 2xl:grid-cols-4">
                <CommonInfoBox label="Full Name" value={profile?.name} />
                <CommonInfoBox label="Email Address" value={profile?.email} />
                <CommonInfoBox label="Role" value={profile?.role} />
                <CommonInfoBox label="Sign-in Provider" value={profile?.provider} />
                <CommonInfoBox
                    label="Email Verified"
                    value={profile?.isVerified === undefined ? "-" : profile?.isVerified ? "Yes" : "No"}
                />
                <CommonInfoBox
                    label="Coin Balance"
                    value={typeof profile?.coinBalance === "number" ? profile.coinBalance.toLocaleString() : "-"}
                />
                <CommonInfoBox label="Member Since" value={formatDateTime(profile?.createdAt)} />
                <CommonInfoBox label="Last Active" value={formatDateTime(profile?.lastActiveAt)} />
            </div>
        </CommonGlassPanel>
    )
}

export default ProfileOverviewSection
