import ProfileChangePasswordCard from "./ProfileChangePasswordCard"
import ProfileDangerZoneSection from "./ProfileDangerZoneSection"

/**
 * Groups the account-security surfaces so the sidebar keeps one entry
 * instead of splitting "password" and "danger zone" into two.
 */
const ProfileSecuritySection = () => {
    return (
        <div className="flex flex-col gap-4 sm:gap-6">
            <ProfileChangePasswordCard />
            <ProfileDangerZoneSection />
        </div>
    )
}

export default ProfileSecuritySection
