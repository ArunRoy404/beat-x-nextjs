"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { FileUp, ScanFace } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import CommonSelect from "@/components/shared/CommonInputs/CommonInput/CommonSelect"
import FileUploadCard from "@/components/shared/CommonInputs/FileUploadCard/FileUploadCard"
import ArtistAuthLayout from "@/components/shared/AuthLayout/ArtistAuthLayout"
import WizardStepDots from "@/components/shared/AuthLayout/WizardStepDots"
import { useArtistAuthWizardStore } from "@/zustandStore/artist/artistAuthWizardStore"

const DOCUMENT_TYPE_OPTIONS = ["National ID", "Passport", "Driving License"]
const VERIFICATION_STEPS = ["Personal Info", "Identity Docs", "Social Links", "Media Assets"]

const inputClassName = "rounded-[16px] bg-dark-accent border-transparent"

const ArtistIdentityDocsPage = () => {
    const router = useRouter()
    const identityDocs = useArtistAuthWizardStore((state) => state.identityDocs)
    const setIdentityDocs = useArtistAuthWizardStore((state) => state.setIdentityDocs)

    const canContinue = identityDocs.frontSide && identityDocs.backSide && identityDocs.selfieWithId

    const handleContinue = () => {
        if (!canContinue) {
            toast.error("Please upload all three documents to continue")
            return
        }
        router.push("/artist/verification/social-links")
    }

    return (
        <ArtistAuthLayout
            backHref="/artist/verification/personal-info"
            stepLabel="Step 3 of 3 — Identity Docs"
            progressPercent={100}
            title="Artist Verification — Identity Docs"
            description="Complete your KYC verification"
            cardClassName="max-w-146"
        >
            <div className="flex w-full flex-col gap-6">
                <div className="flex w-full flex-col gap-4">
                    <CommonSelect
                        label="Document Type"
                        labelClassName="text-[14px]"
                        options={DOCUMENT_TYPE_OPTIONS}
                        className={inputClassName}
                        value={identityDocs.documentType}
                        onChange={(documentType) => setIdentityDocs({ documentType })}
                    />

                    <FileUploadCard
                        icon={<FileUp className="size-6 text-light-gray" />}
                        title="Front Side"
                        subtitle="Clear photo of front of document · JPG/PNG, max 5MB"
                        onFileSelect={(file) => setIdentityDocs({ frontSide: file })}
                    />

                    <FileUploadCard
                        icon={<FileUp className="size-6 text-light-gray" />}
                        title="Back Side"
                        subtitle="Clear photo of back of document · JPG/PNG, max 5MB"
                        onFileSelect={(file) => setIdentityDocs({ backSide: file })}
                    />

                    <FileUploadCard
                        icon={<ScanFace className="size-6 text-light-gray" />}
                        title="Selfie with ID"
                        subtitle="Hold your ID next to your face · JPG/PNG, max 5MB"
                        onFileSelect={(file) => setIdentityDocs({ selfieWithId: file })}
                    />
                </div>

                <div className="flex w-full items-center gap-4">
                    <Button type="button" variant="gradient" size="lg" className="flex-1" onClick={handleContinue}>
                        Continue
                    </Button>
                    <Button type="button" variant="outline" size="lg" className="rounded-full border-light-gray bg-white/10 px-8 text-light-gray backdrop-blur-[10px] hover:bg-white/15" onClick={() => router.push("/artist/verification/personal-info")}>
                        Back
                    </Button>
                </div>

                <WizardStepDots steps={VERIFICATION_STEPS} activeIndex={1} />
            </div>
        </ArtistAuthLayout>
    )
}

export default ArtistIdentityDocsPage
