export const settingsSections = [
  {
    id: "general",
    title: "General",
    icon: "User",
    iconColor: "#3ADFFA",
    iconBg: "rgba(58, 223, 250, 0.15)",
    settings: [
      { id: "maintenanceMode", title: "Maintenance Mode", description: "Take the platform offline for maintenance", enabled: true },
      { id: "userRegistration", title: "User Registration", description: "Allow new users to create accounts", enabled: true },
      { id: "contentUploads", title: "Content Uploads", description: "Allow artists to upload new content", enabled: true },
      { id: "artistVerification", title: "Artist Verification", description: "Accept new verification applications", enabled: true }
    ]
  },
  {
    id: "notifications",
    title: "Notifications",
    icon: "Bell",
    iconColor: "#3ADFFA",
    iconBg: "rgba(58, 223, 250, 0.15)",
    settings: [
      { id: "emailNotifications", title: "Email Notifications", description: "Receive updates via email", enabled: true },
      { id: "pushNotifications", title: "Push Notifications", description: "In-app push notifications", enabled: true }
    ]
  },
  {
    id: "privacy",
    title: "Privacy & Security",
    icon: "ShieldCheck",
    iconColor: "#CC97FF",
    iconBg: "rgba(204, 151, 255, 0.15)",
    settings: [
      { id: "twoFactorAuth", title: "Two-Factor Authentication", description: "Require 2FA for admin login", enabled: true },
      { id: "autoBackup", title: "Auto Backup", description: "Daily automated database backups", enabled: true }
    ]
  }
]

export const dangerZoneActions = [
  {
    id: "clearCache",
    title: "Clear Platform Cache",
    description: "Removes all cached data. May cause a brief slowdown.",
    buttonLabel: "Clear Cache",
    dialogTitle: "Clear Platform Cache",
    dialogDescription: "This will clear all cached data across the platform. Users may experience brief slowdowns. Continue?",
    successMessage: "Platform cache cleared."
  },
  {
    id: "resetAnalytics",
    title: "Reset Analytics Data",
    description: "Permanently deletes all historical analytics. Cannot be recovered.",
    buttonLabel: "Reset Analytics",
    dialogTitle: "Reset Analytics",
    dialogDescription: "This will permanently delete ALL historical analytics data. This action cannot be undone. Are you absolutely sure?",
    successMessage: "Analytics data reset."
  }
]
