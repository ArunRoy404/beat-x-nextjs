"use client"

import React from "react"
import { Heart, ShieldCheck, SlidersHorizontal, UserRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import ProfileIdentityCard from "@/components/user/profile/ProfileIdentityCard"
import ProfileSidebarNav from "@/components/user/profile/ProfileSidebarNav"
import ProfileOverviewSection from "@/components/user/profile/ProfileOverviewSection"
import ProfilePreferencesSection from "@/components/user/profile/ProfilePreferencesSection"
import ProfileFavoritesSection from "@/components/user/profile/ProfileFavoritesSection"
import ProfileSecuritySection from "@/components/user/profile/ProfileSecuritySection"
import { useMyProfile } from "@/hooks/api/user/profile/useMyProfile"
import { useUrlListParams } from "@/hooks/useUrlListParams"

const sections = [
    { id: "overview", title: "Account Overview", icon: <UserRound className="size-4" /> },
    { id: "preferences", title: "Preferences", icon: <SlidersHorizontal className="size-4" /> },
    { id: "favorites", title: "Your Favorites", icon: <Heart className="size-4" /> },
    { id: "security", title: "Security", icon: <ShieldCheck className="size-4" /> },
]

const UserProfilePage = () => {
    const { data: profile, isLoading, isError, refetch } = useMyProfile()
    const { get, setParams } = useUrlListParams()

    // Section lives in the URL so a tab is linkable and survives a refresh.
    const requestedSection = get("section", sections[0].id)
    const activeSection = sections.some((section) => section.id === requestedSection)
        ? requestedSection
        : sections[0].id

    if (isLoading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <Spinner className="size-6 text-secondary" />
            </div>
        )
    }

    if (isError) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center">
                <span className="text-[14px] font-medium text-red-error">Failed to load your profile.</span>
                <Button variant="outline" size="sm" onClick={() => refetch()}>
                    Retry
                </Button>
            </div>
        )
    }

    return (
        <div className="flex w-full flex-col gap-4 py-4 sm:gap-6 sm:py-6">
            <ProfileIdentityCard profile={profile} />

            <div className="flex w-full flex-col gap-4 sm:gap-6 lg:flex-row lg:items-start">
                <ProfileSidebarNav
                    sections={sections}
                    activeSection={activeSection}
                    onSelect={(section) => setParams({ section })}
                />

                <div className="flex min-w-0 flex-1 flex-col gap-4 sm:gap-6">
                    {activeSection === "overview" && <ProfileOverviewSection profile={profile} />}
                    {activeSection === "preferences" && <ProfilePreferencesSection />}
                    {activeSection === "favorites" && <ProfileFavoritesSection profile={profile} />}
                    {activeSection === "security" && <ProfileSecuritySection />}
                </div>
            </div>
        </div>
    )
}

export default UserProfilePage
