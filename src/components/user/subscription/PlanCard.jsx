"use client"

import { Check, X, Sparkle, Cloud, Smartphone, Users } from "lucide-react"
import { cn } from "@/lib/utils"

const featureIcons = {
    sparkle: Sparkle,
    cloud: Cloud,
    devices: Smartphone,
    users: Users,
}

const accentIconClasses = {
    primary: "text-primary",
    secondary: "text-secondary",
    gradient: "text-trending-badge-bg",
}

const ctaClasses = {
    current: "bg-background/40 text-whitetext",
    primary: "bg-primary text-whitetext",
    secondary: "bg-secondary text-button-text",
    gradient: "bg-(image:--button-bg) text-button-text",
}

const PlanCard = ({ plan }) => {
    const accentClass = accentIconClasses[plan.accent]

    return (
        <div
            className={cn(
                "relative flex flex-1 flex-col items-start gap-6 rounded-[32px] border border-(--glass-panel-border) bg-dark-accent p-6 sm:p-8.25",
                plan.glow && "shadow-[0px_0px_5px_0px_rgba(204,151,255,0.5)]"
            )}
        >
            {plan.badge && (
                <span className="absolute -top-3.25 right-6 flex items-center gap-1 rounded-full bg-(image:--button-bg) px-4 py-1 text-xs text-button-text sm:right-8.25">
                    {plan.badge}
                    <Sparkle className="size-4" />
                </span>
            )}

            <div className="flex w-full flex-col gap-2">
                <h3 className="text-2xl text-whitetext">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-semibold text-whitetext sm:text-4xl">{plan.price}</span>
                    <span className="text-sm text-light-gray">/month</span>
                </div>
            </div>

            <ul className="flex w-full flex-col gap-4">
                {plan.features.map((feature) => {
                    if (feature.included !== undefined) {
                        const FeatureIcon = feature.included ? Check : X
                        return (
                            <li key={feature.label} className="flex items-center gap-2">
                                <FeatureIcon className={cn("size-4 shrink-0", feature.included ? "text-whitetext" : "text-light-gray")} />
                                <span className={cn("text-sm", feature.included ? "text-whitetext" : "text-light-gray")}>
                                    {feature.label}
                                </span>
                            </li>
                        )
                    }

                    const FeatureIcon = featureIcons[feature.icon] || Sparkle
                    return (
                        <li key={feature.label} className="flex items-center gap-2">
                            <FeatureIcon className={cn("size-4 shrink-0", accentClass || "text-secondary")} />
                            <span className="text-sm text-whitetext">{feature.label}</span>
                        </li>
                    )
                })}
            </ul>

            <button
                type="button"
                className={cn(
                    "w-full cursor-pointer rounded-full py-4 text-sm font-medium transition-transform active:scale-95",
                    ctaClasses[plan.cta.variant]
                )}
            >
                {plan.cta.label}
            </button>
        </div>
    )
}

export default PlanCard
