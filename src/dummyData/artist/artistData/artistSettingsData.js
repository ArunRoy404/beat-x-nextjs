export const accountSettings = [
  { id: "changeEmail", title: "Change Email", description: "Update your login email address", buttonLabel: "Update" },
  { id: "changePassword", title: "Change Password", description: "Update your password", buttonLabel: "Update" }
]

export const settingsSections = [
  {
    id: "notifications",
    title: "Notifications",
    icon: "Bell",
    iconColor: "#3ADFFA",
    iconBg: "rgba(58, 223, 250, 0.15)",
    settings: [
      { id: "emailNotifications", title: "Email Notifications", description: "Receive updates via email", enabled: true },
      { id: "pushNotifications", title: "Push Notifications", description: "In-app push notifications", enabled: true },
      { id: "newFollowerAlerts", title: "New Follower Alerts", description: "Get notified of new followers", enabled: true },
      { id: "salesNotifications", title: "Sales Notifications", description: "Merch & event sales alerts", enabled: true }
    ]
  },
  {
    id: "privacy",
    title: "Privacy & Security",
    icon: "ShieldCheck",
    iconColor: "#CC97FF",
    iconBg: "rgba(204, 151, 255, 0.15)",
    settings: [
      { id: "publicProfile", title: "Public Profile", description: "Make your artist profile visible to all", enabled: true },
      { id: "showRevenueStats", title: "Show Revenue Stats", description: "Display revenue on public profile", enabled: true }
    ]
  }
]

export const dangerZoneActions = [
  {
    id: "deactivateAccount",
    title: "Deactivate Artist Account",
    dialogTitle: "Deactivate Artist Account",
    dialogDescription: "This will temporarily hide your public artist profile and pause all sales. You can reactivate anytime by logging back in. Continue?",
    successMessage: "Artist account deactivated."
  },
  {
    id: "deleteAccount",
    title: "Delete Account Permanently",
    dialogTitle: "Delete Account Permanently",
    dialogDescription: "This will permanently delete your artist account, including all music, albums, podcasts and revenue history. This action cannot be undone. Are you absolutely sure?",
    successMessage: "Account deleted."
  }
]
