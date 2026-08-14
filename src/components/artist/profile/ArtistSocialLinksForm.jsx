"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import CommonCard from "@/components/shared/CommonCard/CommonCard"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"
import CommonInputContainer from "@/components/shared/CommonInputs/CommonInput/CommonInputContainer"
import { useArtistProfileStore } from "@/zustandStore/artist/artistStore/artistProfileStore"

const socialLinksSchema = z.object({
    twitter: z.string().min(1, "X (Twitter) is required"),
    youtube: z.string().min(1, "YouTube is required"),
    facebook: z.string().min(1, "Facebook is required"),
    instagram: z.string().min(1, "Instagram is required"),
    tiktok: z.string().optional(),
    website: z.string().optional(),
    spotify: z.string().optional(),
    appleMusic: z.string().optional(),
    soundcloud: z.string().optional(),
    amazonMusic: z.string().optional(),
})

const ArtistSocialLinksForm = () => {
    const socialLinks = useArtistProfileStore((state) => state.socialLinks)
    const updateSocialLinks = useArtistProfileStore((state) => state.updateSocialLinks)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(socialLinksSchema),
        defaultValues: socialLinks,
    })

    const onSubmit = (data) => {
        updateSocialLinks(data)
        toast.success("Social links updated successfully!")
    }

    const onInvalid = (validationErrors) => {
        const errorKeys = Object.keys(validationErrors)
        if (errorKeys.length > 0) {
            toast.error(validationErrors[errorKeys[0]].message)
        }
    }

    return (
        <CommonCard className="flex flex-col gap-5 w-full">
            <h3 className="text-whitetext text-[24px] font-semibold z-10 relative">
                Social Links
            </h3>

            <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="flex flex-col gap-4 z-10 relative">
                <CommonInputContainer>
                    <CommonInput
                        label="X (Twitter) *"
                        placeholder="@yourhandle"
                        {...register("twitter")}
                        error={errors.twitter?.message}
                    />
                    <CommonInput
                        label="YouTube *"
                        placeholder="https://youtube.com/@channel"
                        {...register("youtube")}
                        error={errors.youtube?.message}
                    />
                </CommonInputContainer>

                <CommonInputContainer>
                    <CommonInput
                        label="Facebook *"
                        placeholder="https://facebook.com/yourpage"
                        {...register("facebook")}
                        error={errors.facebook?.message}
                    />
                    <CommonInput
                        label="Instagram *"
                        placeholder="@yourhandle"
                        {...register("instagram")}
                        error={errors.instagram?.message}
                    />
                </CommonInputContainer>

                <CommonInputContainer>
                    <CommonInput
                        label="TikTok (optional)"
                        placeholder="@yourhandle"
                        {...register("tiktok")}
                        error={errors.tiktok?.message}
                    />
                    <CommonInput
                        label="Official Website (optional)"
                        placeholder="https://yourwebsite.com"
                        {...register("website")}
                        error={errors.website?.message}
                    />
                </CommonInputContainer>

                <CommonInputContainer>
                    <CommonInput
                        label="Spotify"
                        placeholder="Your Spotify profile URL"
                        {...register("spotify")}
                        error={errors.spotify?.message}
                    />
                    <CommonInput
                        label="Apple Music"
                        placeholder="Your Apple Music profile URL"
                        {...register("appleMusic")}
                        error={errors.appleMusic?.message}
                    />
                </CommonInputContainer>

                <CommonInputContainer>
                    <CommonInput
                        label="SoundCloud"
                        placeholder="Your SoundCloud profile URL"
                        {...register("soundcloud")}
                        error={errors.soundcloud?.message}
                    />
                    <CommonInput
                        label="Amazon Music"
                        placeholder="Your Amazon Music profile URL"
                        {...register("amazonMusic")}
                        error={errors.amazonMusic?.message}
                    />
                </CommonInputContainer>

                {/* Save */}
                <div className="mt-2">
                    <Button type="submit" variant="gradient" size="lg">
                        Save Links
                    </Button>
                </div>
            </form>
        </CommonCard>
    )
}

export default ArtistSocialLinksForm
