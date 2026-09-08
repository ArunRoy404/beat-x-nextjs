import CommonGlassPanel from "@/components/shared/CommonGlassPanel"
import ProfileSectionHeader from "./ProfileSectionHeader"
import ProfileSettingRow from "./ProfileSettingRow"

const ProfilePreferencesSection = ({ settings }) => {
    return (
        <CommonGlassPanel className="flex flex-col gap-2 p-4 sm:p-5">
            <ProfileSectionHeader
                title="Preferences"
                description="Your saved app preferences."
            />

            <div className="flex flex-col">
                <ProfileSettingRow label="Language" value={settings?.language} />
                <ProfileSettingRow label="Theme" value={settings?.theme} />
                <ProfileSettingRow
                    label="Passcode Lock"
                    description="Require a passcode to open the app"
                    value={settings?.enablePasscode}
                />
                <ProfileSettingRow
                    label="SMS Alerts"
                    description="Receive account alerts by text message"
                    value={settings?.allowSms}
                />
                <ProfileSettingRow
                    label="Email Notifications"
                    description="Product news and account activity"
                    value={settings?.allowEmailNotification}
                />
                <ProfileSettingRow
                    label="Search History"
                    description="Track searches to improve recommendations"
                    value={settings?.trackSearchHistory}
                />
                <ProfileSettingRow
                    label="Usage Data"
                    description="Share anonymous usage data with BeatX"
                    value={settings?.sendUsageData}
                />
                <ProfileSettingRow
                    label="Wi-Fi Only Mode"
                    description="Stream and download over Wi-Fi only"
                    value={settings?.wifiOnlyMode}
                />
            </div>
        </CommonGlassPanel>
    )
}

export default ProfilePreferencesSection
