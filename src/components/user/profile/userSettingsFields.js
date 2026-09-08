/**
 * The settings this app reads and writes, in display order.
 *
 * `theme`, `language` and `wifiOnlyMode` are returned by GET /users/settings
 * but are deliberately excluded here — they are neither shown nor ever sent
 * in a PATCH /users/settings body.
 *
 * Plain data (no "use client") so a Server Component could import it too.
 */
export const USER_EDITABLE_SETTINGS = [
  {
    key: "enablePasscode",
    label: "Passcode Lock",
    description: "Require a passcode to open the app",
  },
  {
    key: "allowSms",
    label: "SMS Alerts",
    description: "Receive account alerts by text message",
  },
  {
    key: "allowEmailNotification",
    label: "Email Notifications",
    description: "Product news and account activity",
  },
  {
    key: "trackSearchHistory",
    label: "Search History",
    description: "Track searches to improve recommendations",
  },
  {
    key: "sendUsageData",
    label: "Usage Data",
    description: "Share anonymous usage data with BeatX",
  },
]
