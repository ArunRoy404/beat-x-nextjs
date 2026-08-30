"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"
import ArtistAuthLayout from "@/components/shared/AuthLayout/ArtistAuthLayout"
import WizardStepDots from "@/components/shared/AuthLayout/WizardStepDots"
import { useArtistAuthWizardStore } from "@/zustandStore/artist/artistAuthWizardStore"

const VERIFICATION_STEPS = ["Personal Info", "Identity Docs", "Social Links", "Media Assets"]

const inputClassName = "rounded-[16px] bg-dark-accent border-transparent"
const labelClassName = "text-[14px]"
const fieldClassName = "text-[14px]"

const socialLinksSchema = z.object({
    twitter: z.string().min(1, "X (Twitter) handle is required"),
    youtube: z.string().min(1, "YouTube channel is required"),
    facebook: z.string().min(1, "Facebook page is required"),
    instagram: z.string().min(1, "Instagram handle is required"),
    tiktok: z.string().optional(),
    website: z.string().optional(),
    spotify: z.string().optional(),
    appleMusic: z.string().optional(),
    youtubeMusic: z.string().optional(),
    youtubeMusicSecondary: z.string().optional(),
    soundcloud: z.string().optional(),
    amazonMusic: z.string().optional(),
})

const ArtistSocialLinksPage = () => {
    const router = useRouter()
    const socialLinks = useArtistAuthWizardStore((state) => state.socialLinks)
    const setSocialLinks = useArtistAuthWizardStore((state) => state.setSocialLinks)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(socialLinksSchema),
        defaultValues: socialLinks,
    })

    const onSubmit = (data) => {
        setSocialLinks(data)
        router.push("/artist/verification/media-assets")
    }

    const onInvalid = (validationErrors) => {
        const errorKeys = Object.keys(validationErrors)
        if (errorKeys.length > 0) {
            toast.error(validationErrors[errorKeys[0]].message)
        }
    }

    return (
        <ArtistAuthLayout
            backHref="/artist/verification/identity-docs"
            stepLabel="Step 3 of 3 — Social Links"
            progressPercent={100}
            title="Artist Verification — Social Links"
            description="Complete your KYC verification"
            cardClassName="max-w-225"
        >
            <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="flex w-full flex-col gap-6">
                <div className="flex w-full flex-col gap-4">
                    <p className="text-light-gray text-[16px] w-full">Required social profiles</p>

                    <div className="flex flex-col gap-4 sm:flex-row">
                        <CommonInput label="X (Twitter) *" labelClassName={labelClassName} className={cn(inputClassName, fieldClassName)} placeholder="@yourhandle" containerClassName="flex-1" {...register("twitter")} error={errors.twitter?.message} />
                        <CommonInput label="YouTube *" labelClassName={labelClassName} className={cn(inputClassName, fieldClassName)} placeholder="https://youtube.com/@channel" containerClassName="flex-1" {...register("youtube")} error={errors.youtube?.message} />
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <CommonInput label="Facebook *" labelClassName={labelClassName} className={cn(inputClassName, fieldClassName)} placeholder="https://facebook.com/yourpage" containerClassName="flex-1" {...register("facebook")} error={errors.facebook?.message} />
                        <CommonInput label="Instagram *" labelClassName={labelClassName} className={cn(inputClassName, fieldClassName)} placeholder="@yourhandle" containerClassName="flex-1" {...register("instagram")} error={errors.instagram?.message} />
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <CommonInput label="TikTok (optional)" labelClassName={labelClassName} className={cn(inputClassName, fieldClassName)} placeholder="@yourhandle" containerClassName="flex-1" {...register("tiktok")} />
                        <CommonInput label="Official Website (optional)" labelClassName={labelClassName} className={cn(inputClassName, fieldClassName)} placeholder="https://yourwebsite.com" containerClassName="flex-1" {...register("website")} />
                    </div>
                </div>

                <p className="text-whitetext/40 text-[11px] w-full">Music platform links (optional)</p>

                <div className="flex w-full flex-col gap-4">
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <CommonInput label="Spotify" labelClassName={labelClassName} className={cn(inputClassName, fieldClassName)} placeholder="Your Spotify profile URL" containerClassName="flex-1" {...register("spotify")} />
                        <CommonInput label="Apple Music" labelClassName={labelClassName} className={cn(inputClassName, fieldClassName)} placeholder="Your Apple Music profile URL" containerClassName="flex-1" {...register("appleMusic")} />
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <CommonInput label="YouTube Music" labelClassName={labelClassName} className={cn(inputClassName, fieldClassName)} placeholder="Your Apple Music profile URL" containerClassName="flex-1" {...register("youtubeMusic")} />
                        <CommonInput label="YouTube Music" labelClassName={labelClassName} className={cn(inputClassName, fieldClassName)} placeholder="Your YouTube Music profile URL" containerClassName="flex-1" {...register("youtubeMusicSecondary")} />
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <CommonInput label="SoundCloud" labelClassName={labelClassName} className={cn(inputClassName, fieldClassName)} placeholder="Your SoundCloud profile URL" containerClassName="flex-1" {...register("soundcloud")} />
                        <CommonInput label="Amazon Music" labelClassName={labelClassName} className={cn(inputClassName, fieldClassName)} placeholder="Your Amazon Music profile URL" containerClassName="flex-1" {...register("amazonMusic")} />
                    </div>
                </div>

                <div className="flex w-full items-center gap-4">
                    <Button type="submit" variant="gradient" size="lg" className="flex-1">
                        Continue
                    </Button>
                    <Button type="button" variant="outline" size="lg" className="rounded-full border-light-gray bg-white/10 px-8 text-light-gray backdrop-blur-[10px] hover:bg-white/15" onClick={() => router.push("/artist/verification/identity-docs")}>
                        Back
                    </Button>
                </div>

                <WizardStepDots steps={VERIFICATION_STEPS} activeIndex={2} />
            </form>
        </ArtistAuthLayout>
    )
}

export default ArtistSocialLinksPage
