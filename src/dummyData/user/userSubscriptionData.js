import { userSubscriptionAssets } from "./userSubscriptionAssets"

export const subscriptionHero = {
  title: "ELEVATE YOUR",
  highlight: "SONIC REALITY",
  description:
    "Break the limits of standard audio. Immerse yourself in high-fidelity landscapes with the most curated listening experience in the void.",
}

export const subscriptionPlans = [
  {
    id: "free",
    name: "Free",
    price: "৳0",
    features: [
      { label: "Ad-supported listening", included: true },
      { label: "Offline mode", included: false },
      { label: "Hi-Fi Spatial Audio", included: false },
    ],
    cta: { label: "Current Plan", variant: "current" },
  },
  {
    id: "premium",
    name: "Premium",
    price: "৳200",
    badge: "BEST VALUE",
    accent: "primary",
    glow: true,
    features: [
      { label: "Ad-free experience", icon: "sparkle" },
      { label: "Unlimited offline mode", icon: "cloud" },
      { label: "Lossless Hi-Fi Audio", icon: "sparkle" },
      { label: "Listen on any device", icon: "devices" },
    ],
    cta: { label: "Upgrade Plan", variant: "primary" },
  },
  {
    id: "family",
    name: "Family",
    price: "৳500",
    accent: "gradient",
    features: [
      { label: "All Premium features", icon: "sparkle" },
      { label: "Kids-only safe app", icon: "sparkle" },
      { label: "Up to 6 accounts", icon: "devices" },
    ],
    cta: { label: "Get Family Plan", variant: "gradient" },
  },
  {
    id: "student",
    name: "Student",
    price: "৳100",
    accent: "secondary",
    features: [
      { label: "Verified student discount", icon: "sparkle" },
      { label: "All Premium features", icon: "sparkle" },
      { label: "Hulu & Showtime access", icon: "devices" },
    ],
    cta: { label: "Verify & Start Student Plan", variant: "secondary" },
  },
]

export const featureBreakdownTable = {
  columns: [
    { label: "Free", accent: "plain" },
    { label: "Premium", accent: "primary" },
    { label: "Family", accent: "gradient" },
    { label: "Student", accent: "secondary" },
  ],
  rows: [
    { feature: "Price", values: ["৳0", "৳200", "৳500", "৳100"] },
    { feature: "Audio Quality", values: ["160kbps", "Lossless 24-bit", "Lossless 24-bit", "Lossless 24-bit"] },
    { feature: "Ads", values: ["Visual & Audio", "None", "None", "None"] },
    { feature: "Offline Playback", values: ["Disabled", "Unlimited", "Unlimited", "Unlimited"] },
    { feature: "Spatial Audio", values: ["Standard", "Dolby Atmos", "Dolby Atmos", "Dolby Atmos"] },
    { feature: "Exclusive Content", values: ["Limited", "Full Access", "Full Access", "Full Access"] },
  ],
}

export const subscriptionBenefits = [
  {
    id: "studio-grade",
    title: "Studio Grade",
    description: "Hear every nuance exactly as the artist intended in the recording booth.",
    image: userSubscriptionAssets.benefits.studioGrade,
  },
  {
    id: "always-connected",
    title: "Always Connected",
    description: "Download your entire library and listen in the deepest tunnels or highest peaks.",
    image: userSubscriptionAssets.benefits.alwaysConnected,
  },
  {
    id: "zero-distraction",
    title: "Zero Distraction",
    description: "No ads, no interruptions. Pure, unfiltered auditory flow 24/7.",
    image: userSubscriptionAssets.benefits.zeroDistraction,
  },
]

export const subscriptionFaqs = [
  {
    id: "switch-plans",
    question: "Can I switch plans later?",
    answer:
      "Absolutely. You can upgrade or downgrade your plan at any time through your account settings. Changes take effect on your next billing cycle.",
  },
  {
    id: "student-verification",
    question: 'What is the "Student" verification?',
    answer:
      "We use SheerID to verify enrollment status. You'll need to provide proof of current enrollment at an accredited university or college.",
  },
]

export const subscriptionBrandFooter = {
  name: "Sonic Prism",
  tagline: "THE FUTURE OF ACOUSTIC HIGH FIDELITY",
  links: ["Terms", "Privacy", "Contact"],
}
