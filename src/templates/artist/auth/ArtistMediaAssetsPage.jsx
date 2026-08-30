"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { Camera } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import FileUploadCard from "@/components/shared/CommonInputs/FileUploadCard/FileUploadCard"
import FileUploadRow from "@/components/shared/CommonInputs/FileUploadCard/FileUploadRow"
import ArtistAuthLayout from "@/components/shared/AuthLayout/ArtistAuthLayout"
import WizardStepDots from "@/components/shared/AuthLayout/WizardStepDots"
import { useArtistAuthWizardStore } from "@/zustandStore/artist/artistAuthWizardStore"

const VERIFICATION_STEPS = ["Personal Info", "Identity Docs", "Social Links", "Media Assets"]

const ArtistMediaAssetsPage = () => {
    const router = useRouter()
    const mediaAssets = useArtistAuthWizardStore((state) => state.mediaAssets)
    const setMediaAssets = useArtistAuthWizardStore((state) => state.setMediaAssets)
    const resetWizard = useArtistAuthWizardStore((state) => state.reset)

    const handleSubmit = () => {
        if (!mediaAssets.profilePicture) {
            toast.error("Profile picture is required to submit your application")
            return
        }
        router.push("/artist/verification/submitted")
        resetWizard()
    }

    return (
        <ArtistAuthLayout
            backHref="/artist/verification/social-links"
            stepLabel="Step 3 of 3 — Media Assets"
            progressPercent={100}
            title="Artist Verification — Media Assets"
            description="Complete your KYC verification"
            cardClassName="max-w-170"
        >
            <div className="flex w-full flex-col gap-6">
                <FileUploadCard
                    icon={<Camera className="size-6 text-light-gray" />}
                    title="Profile Picture *"
                    subtitle="Minimum 1000×1000 px · JPG or PNG"
                    onFileSelect={(file) => setMediaAssets({ profilePicture: file })}
                />

                <div className="flex w-full flex-col gap-4">
                    <p className="text-whitetext/40 text-[11px] w-full">Optional materials</p>

                    <div className="flex w-full flex-col gap-2">
                        <FileUploadRow
                            label="Media Kit PDF"
                            fileName={mediaAssets.mediaKit?.name}
                            onFileSelect={(file) => setMediaAssets({ mediaKit: file })}
                        />
                        <FileUploadRow
                            label="Press Release"
                            fileName={mediaAssets.pressRelease?.name}
                            onFileSelect={(file) => setMediaAssets({ pressRelease: file })}
                        />
                        <FileUploadRow
                            label="Promotional Materials"
                            fileName={mediaAssets.promotionalMaterials?.name}
                            onFileSelect={(file) => setMediaAssets({ promotionalMaterials: file })}
                        />
                    </div>

                    <div className="flex w-full flex-col gap-2 rounded-[16px] border border-yellow-warning bg-yellow-warning/10 p-4.25">
                        <p className="text-yellow-warning text-[14px] font-semibold w-full">Review before submitting</p>
                        <p className="text-light-gray text-[12px] w-full">
                            Ensure all information is accurate. Incorrect documents may lead to rejection. You can reapply after 7 days.
                        </p>
                    </div>
                </div>

                <div className="flex w-full items-center gap-4">
                    <Button type="button" variant="gradient" size="lg" className="flex-1" onClick={handleSubmit}>
                        Submit Application
                    </Button>
                    <Button type="button" variant="outline" size="lg" className="rounded-full border-light-gray bg-white/10 px-8 text-light-gray backdrop-blur-[10px] hover:bg-white/15" onClick={() => router.push("/artist/verification/social-links")}>
                        Back
                    </Button>
                </div>

                <WizardStepDots steps={VERIFICATION_STEPS} activeIndex={3} />
            </div>
        </ArtistAuthLayout>
    )
}

export default ArtistMediaAssetsPage
